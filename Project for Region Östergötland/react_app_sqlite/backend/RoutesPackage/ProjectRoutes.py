#####################################################
#                                                   #
#                     Company 4                     #
#   Module for routes and views of Project model    #
#                                                   #
#####################################################


from RoutesInterfaceIn import *

##################################### AppRoute for Project #############################################################


# Add new project
@app.route("/add_new_project", methods=["POST"])
@cross_origin()
def add_new_project():
    if request.method == "POST":
        data = request.get_json()
        keys_list = list(data.keys())
        user = User.query.get_or_404(data["creator_id"])
        newProject = Project(title=data["title"], creator_id=user.userId, importance=data["importance"],
                             difference=data["difference"], requirements=data["requirements"], unit=data["unit"],
                             how_often=data["how_often"])

        if data["deadline"] != 'inget datum':
            newProject.deadline = datetime.strptime(
                data["deadline"], '%Y-%m-%d %H:%M:%S')
        if data["startTime"] != 'inget datum':
            newProject.startTime = datetime.strptime(
                data["startTime"], '%Y-%m-%d %H:%M:%S')

        if 'status' in keys_list:
            if data["status"] == 'Utkast':
                newProject.status = statusProject.utkast
            elif data['status'] == 'Not yet Started':
                newProject.status = statusProject.not_yet_started
            elif data['status'] == 'P':
                newProject.status = statusProject.p
            elif data['status'] == 'D':
                newProject.status = statusProject.d
            elif data['status'] == 'S':
                newProject.status = statusProject.s
            elif data['status'] == 'A':
                newProject.status = statusProject.a
            elif data['status'] == 'Finished':
                newProject.status = statusProject.finished
            elif data["status"] == "Archived":
                newProject.status = statusProject.archived
            

        if 'evaluation' in keys_list:
            newProject.evaluation = data['evaluation']
        if 'evaluationSummary' in keys_list:
            newProject.evaluationSummary = data['evaluationSummary']
        if 'evaluationExplanation' in keys_list:
            newProject.evaluationExplanation = data['evaluationExplanation']

        for category in data["categories"]:
            newProject.categories.append(Category.query.get_or_404(category))
        
        db.session.add(newProject)
        newTask = Task(taskName="Mäta nuläget", taskDescription="Gör mätning på förbättringsarbetet!", status=statusTask.not_yet_started)
        newProject.tasks.append(newTask)                                            #Add a "starter" task to the project  
        db.session.add(newTask)

        db.session.commit()
        p = Project.serialize(newProject)
        return jsonify(p)


# Get all projects in the database
@app.route("/get_all_projects", methods=["GET"])
@cross_origin()
def get_all_projects():
    if request.method == 'GET':
        project = []
        projects = Project.query.all()
        for p in projects:
            project.append(Project.serialize(p))
        return jsonify(project)


# Get, edit or delete a specific project
# DELETE is not properly implemented because a project should not be deleted
@app.route("/project/<int:project_id>", methods=["GET", "PUT", "DELETE"])
@cross_origin()
def edit_delete_get_project(project_id):
    project = Project.query.get_or_404(project_id)
    if request.method == 'GET':
        return jsonify(Project.serialize(project))
    elif request.method == 'PUT':
        data = request.get_json()
        keys_list = data.keys()
        if 'title' in keys_list:
            project.title = data["title"]
        if 'unit' in keys_list:
            project.unit = data["unit"]
        if 'method' in keys_list:
            project.method = data['method']
        if 'timeLine' in keys_list:
            project.timeLine = data['timeLine']
        
        if 'deadline' in keys_list:
            if data["deadline"] != 'inget datum':
                project.deadline = datetime.strptime(
                    data["deadline"], '%Y-%m-%d %H:%M:%S')
        if 'startTime' in keys_list:
            if data["startTime"] != 'inget datum':
                project.startTime = datetime.strptime(
                    data["startTime"], '%Y-%m-%d %H:%M:%S')
        if 'importance' in keys_list:
            project.importance = data["importance"]
        if 'difference' in keys_list:
            project.difference = data["difference"]
        if 'requirements' in keys_list:
            project.requirements = data["requirements"]
        if 'how_often' in keys_list: 
            project.how_often = data['how_often']
        if 'categories' in keys_list:
            new_category_ids = data["categories"]
            # Create a copy of the current categories list
            current_categories = list(project.categories)

            # Remove categories that are not in the new list
            for category in current_categories:
                if category.categoryId not in new_category_ids:
                    project.categories.remove(category)

            # Add categories that are not already there
            for category_id in new_category_ids:
                if category_id not in [c.categoryId for c in project.categories]:
                    category = Category.query.get_or_404(category_id)
                    project.categories.append(category)
        if 'users' in keys_list:

            abort(400, 'Users not implemented yet')
        if 'evaluation' in keys_list:
            project.evaluation = data['evaluation']
        if 'evaluationSummary' in keys_list:
            project.evaluationSummary = data['evaluationSummary']
        if 'evaluationExplanation' in keys_list:
            project.evaluationExplanation = data['evaluationExplanation']
        if 'status' in keys_list:
            if data["status"] == 'Utkast':
                project.status = statusProject.utkast
            if data['status'] == 'Not yet Started':
                project.status = statusProject.not_yet_started
            if data['status'] == 'P':
                project.status = statusProject.p
            if data['status'] == 'D':
                project.status = statusProject.d
            if data['status'] == 'S':
                project.status = statusProject.s
            if data['status'] == 'A':
                project.status = statusProject.a
            if data['status'] == 'Finished':
                project.status = statusProject.finished
            elif data["status"] == "Archived":
                project.status = statusProject.archived
            notify_users(project, data["status"])
        db.session.commit()
        return jsonify([Project.serialize(project)])
    elif request.method == 'DELETE':
        db.session.delete(project)
        db.session.commit()
        return jsonify("DELETE COMPLETE")


# Get all projects that a user is a part of
@app.route("/get_all_projects_by_user", methods=["GET"])
@cross_origin()
@jwt_required()
def get_all_projects_by_user():
    if request.method == 'GET':
        user = get_jwt_identity()
    
        rowsUserProject = db.session.query(user_project).filter( user_project.c.user_id == user['userId'], ).all()
        project_ids = [row[1] for row in rowsUserProject]
        projects = []
        projectsQuery = Project.query.filter_by(creator_id=user['userId'], status=statusProject.utkast).all()
        for p in projectsQuery: 
            projects.append(p.serialize())
        for p in project_ids: 
            projects.append(Project.query.get_or_404(p).serialize())
        return jsonify(projects)
    

# Get all projects from a user that is a draft
@app.route("/get_all_project_drafts_by_user", methods=["GET"])
@cross_origin()
@jwt_required()
def get_all_project_drafts_by_user():
    if request.method == 'GET':
        user = get_jwt_identity()

        projectsQuery = Project.query.filter_by(creator_id=user['userId'], status=statusProject.utkast).all()
        projects = []
        for p in projectsQuery: 
            projects.append(p.serialize())
        return jsonify(projects)
    

#Get all projects from a unit
@app.route("/get_all_projects_in_unit/<string:unit>", methods=["GET"])
@cross_origin()
def get_all_projects_in_unit(unit):
    if request.method == 'GET':
        projects = []
        projectsQuery = Project.query.filter_by(unit=unit).all()
        for p in projectsQuery: 
            projects.append(p.serialize())
        return jsonify(projects)


#helpfunctions for project
#write a functions that notices all users on a project when the status changes
def notify_users(project, status):
    for user in project.users:
        if status == 'D':
            status = 'G'
        if status in ['P', 'G', 'S', 'A']:
            notification = Notification(userId=user.userId, projectId=project.projectId, message="Förbättringsarbetet \"" + project.title + "\" har ändrat status till " + status)
        elif status == 'Finished':
            notification = Notification(userId=user.userId, projectId=project.projectId, message="Förbättringsarbetet \"" + project.title + "\" är nu avslutat!")
        
        db.session.add(notification)
        db.session.commit()