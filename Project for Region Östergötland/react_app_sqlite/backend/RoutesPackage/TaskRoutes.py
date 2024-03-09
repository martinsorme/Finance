#####################################################
#                                                   #
#                     Company 4                     #
#     Module for routes and views of Task model     #
#                                                   #
#####################################################


from RoutesInterfaceIn import *

##################################### AppRoute for Task #############################################################


# Add new task to project
@app.route("/add_new_task/<int:project_id>", methods=["POST"])
@cross_origin()
def add_new_task(project_id):
    Project.query.get_or_404(project_id)
    if request.method == "POST":
        data = request.get_json()
        newTask = Task(taskName=data["taskName"], taskDescription=data["taskDescription"], project_id=project_id)
        if 'status' in data.keys():
            if data['status'] == 'Not yet Started':
                newTask.status = statusTask.not_yet_started
            elif data['status'] == 'Finished':
                newTask.status = statusTask.finished
            elif data['status'] == 'Ongoing':
                newTask.status = statusTask.ongoing
        db.session.add(newTask)
        db.session.commit()
        return jsonify(Task.serialize(newTask))
    

# Add a new result to a task
@app.route("/add_new_result_to_task/<int:task_id>", methods=["PUT"])
@cross_origin()
def add_new_result(task_id):

    task = Task.query.get_or_404(task_id)
    if request.method == "PUT":
        data = request.get_json()
        task.result = data["result"]
        db.session.commit()
        return jsonify(Task.serialize(task))


# Get all tasks in the database
@app.route("/get_all_tasks", methods=['GET'])
def get_all_tasks():
    if request.method == 'GET':
        task = []
        tasks = Task.query.all()
        for t in tasks:
            task.append(Task.serialize(t))
        return jsonify(task)

# Get, edit or delete a specific task
# DELETE is not properly implemented because a task should not be deleted
@app.route("/task/<int:task_id>", methods=['PUT', 'GET', 'DELETE'])
@cross_origin()
def edit_delete_get_task(task_id):
    task = Task.query.get_or_404(task_id)
    if request.method == 'GET':
        return jsonify([Task.serialize(task)])
    elif request.method == 'PUT':
        data = request.get_json()
        keys_list = data.keys()
        if 'taskName' in keys_list:
            task.taskName = data["taskName"]
        if 'taskDescription' in keys_list:
            task.taskDescription = data["taskDescription"]
        if 'status' in keys_list:
            if data['status'] == 'Not yet Started':
                task.status = statusTask.not_yet_started
            if data['status'] == 'Finished':
                task.status = statusTask.finished
                notify_users(task)
            elif data['status'] == 'Ongoing':
                task.status = statusTask.ongoing
        db.session.commit()
        return jsonify([Task.serialize(task)])
    elif request.method == 'DELETE':
        db.session.delete(task)
        db.session.commit()
        return jsonify("DELETE COMPLETE")
    
    #help function to notify users when a task is finished
def notify_users(task):
    for user in task.users:
        notification = Notification(userId=user.userId, projectId=task.project.projectId, message="Uppgiften \"" + task.taskName + "\" i förbättringsarbetet \"" + task.project.title + "\" är nu avklarat")
        db.session.add(notification)
        db.session.commit()