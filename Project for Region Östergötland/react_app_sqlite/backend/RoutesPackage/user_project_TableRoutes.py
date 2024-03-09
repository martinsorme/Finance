#####################################################
#                                                   #
#                     Company 4                     #
# Module for routes and views of user_project table #
#                                                   #
#####################################################


from RoutesInterfaceIn import *

##################################### AppRoute for table user_project #############################################################

# Add new user to project
@app.route("/add_user_to_project/<int:project_id>/<int:user_id>", methods=['POST'])
@cross_origin()
def add_user_to_project(user_id, project_id):
    user = User.query.get_or_404(user_id)
    project = Project.query.get_or_404(project_id)
    data = request.get_json()
    if request.method == 'POST':
        if user in project.users:
            return jsonify("User already in project"), 401              #Cannot add user to project if user is already in project
        user_role = ""
        if data['role'] == 'Team-Leader':
            user_role = ProjectRole.team_Leader
        elif data['role'] == 'Team-Member':
            user_role = ProjectRole.team_Member
        elif data['role'] == 'Viewer':
            user_role = ProjectRole.viewer
        Project.populate_user_project_role(project, user, user_role)
        notification = Notification(userId=user_id, projectId=project_id, message="Du har lagts till i förbättringsarbetet \"" + project.title + "\"")
        db.session.add(notification)                                    #Create a notification for the user
        db.session.commit()

        return jsonify("User added to project"), 200


# Change role of user on project
@app.route("/change_project_role_of_user/<int:project_id>/<int:user_id>", methods=['PUT'])
def change_role(user_id, project_id):
    if request.method == 'PUT':
        user = User.query.get_or_404(user_id)
        project = Project.query.get_or_404(project_id)
        data = request.get_json()
        if data['role'] == 'Team-Leader':
            new_role = ProjectRole.team_Leader
        elif data['role'] == 'Team-Member':
            new_role = ProjectRole.team_Member
        elif data['role'] == 'Viewer':
            new_role = ProjectRole.viewer
        statement = user_project.update().where((user_project.c.user_id == user.userId) & (user_project.c.project_id == project.projectId)
                                                ).values(user_role=new_role)    #Update the role of the user on the project directly in the table
        db.session.execute(statement)
        db.session.commit()
        return jsonify(Project.serialize(project))


# Remove user from project
@app.route("/remove_user_from_project/<int:project_id>/<int:user_id>", methods=["DELETE"])
@cross_origin()
def remove_user(user_id, project_id):
    if request.method == 'DELETE':
        user = User.query.get_or_404(user_id)
        project = Project.query.get_or_404(project_id)
        tasks = Task.query.filter_by(project_id=project_id).all()
        for task in tasks:
            if user in task.users:
                task.users.remove(user)                                 #Remove user from all their tasks in the project
        
        if user not in project.users:
            return jsonify("User not in project"), 401                  #Cannot remove user from project if user is not in project

        project.users.remove(user)
        
        db.session.commit()
        return jsonify(Project.serialize(project))


# Get all users on project together with their role
@app.route("/get_all_users_on_project/<int:project_id>", methods=['GET'])
@cross_origin()
def get_all_users_on_project(project_id):
    project = Project.query.get_or_404(project_id)
    users = []
    for user in project.users:
        temp_user_project = db.session.query(user_project).filter_by(
            user_id=user.userId, project_id=project.projectId).first()
        role = temp_user_project.user_role
        dic = User.serialize(user)
        dic['projectRole'] = str(role.value)
        users.append(dic)
    return jsonify(users)