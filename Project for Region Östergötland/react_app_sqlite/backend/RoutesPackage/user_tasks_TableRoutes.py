#####################################################
#                                                   #
#                     Company 4                     #
#   Module for routes and views of user_task table  #
#                                                   #
#####################################################


from RoutesInterfaceIn import *
from sqlalchemy.orm.exc import StaleDataError


##################################### AppRoute for table user_task #############################################################

# Add new task to user
@app.route("/add_user_to_task/<int:task_id>/<int:user_id>", methods=['POST'])
@cross_origin()
def add_user_to_task(task_id, user_id):
    if request.method == 'POST':
        user = User.query.get_or_404(user_id)
        task = Task.query.get_or_404(task_id)
        if user not in task.project.users:
            return jsonify("User not in project"), 401              #Cannot add user to task if user is not in project
        
        if user in task.users:
            return jsonify("User already in task")                  #Cannot add user to task if user is already in task
        
        user.tasks.append(task)
        db.session.commit()
        notification = Notification(userId=user_id, projectId=task.project.projectId, message="Du har lagts till i uppgiften \"" + task.taskName + "\" i förbättringsarbetet \"" + task.project.title + "\"")
        db.session.add(notification)                                #Create a notification for the user
        db.session.commit()
        return jsonify(task.serialize())


# Remove user from task
@app.route("/remove_user_from_task/<int:task_id>/<int:user_id>", methods=["DELETE"])
@cross_origin()
def remove_user_from_task(user_id, task_id):
    if request.method == 'DELETE':
        user = User.query.get_or_404(user_id)
        task = Task.query.get_or_404(task_id)
        if user not in task.users:
            return jsonify("User not in task"), 401                 #Cannot remove user from task if user is not in task
        task.users.remove(user)
        db.session.commit()
        return jsonify(task.serialize())


# Get all users on task
@app.route("/get_all_users_on_task/<int:task_id>", methods=['GET'])
@cross_origin()
def get_all_users_on_task(task_id):
    if request.method == 'GET':
        task = Task.query.get_or_404(task_id)
        users = []
        return jsonify([users.serialize() for users in task.users])
    

# Specify users on a specific task
@app.route("/specify_users_for_task/<int:task_id>", methods=['PUT'])
@cross_origin()
def specify_users_for_task(task_id):
    if request.method == 'PUT':
        data = request.get_json()
        task = Task.query.get_or_404(task_id)

        current_users = task.users

        for user in current_users:
            task.users.remove(user)
            db.session.commit()
    
        for user_id in data['users']:
            user = User.query.get_or_404(user_id)
            if user not in task.users:
                task.users.append(user)
            if user in current_users:
                #TODO: Känns väldigt konstigt hur detta är uppbyggt. Det verkar som att users läggs till på en task, men det är endast de som redan finns som får notification, borde kanske vara tvärtom? Har inte tid att kolla på det just nu - Lukas 28/11
                notification = Notification(userId=user_id, projectId=task.project.projectId, message="Du har lagts till i uppgiften \"" + task.taskName + "\" i förbättringsarbetet \"" + task.project.title + "\"")
                db.session.add(notification)                        

        db.session.commit()
        return jsonify(task.serialize())