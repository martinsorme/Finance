#####################################################
#                                                   #
#                     Company 4                     #
#   Module for routes and views of LogBook model    #
#                                                   #
#####################################################


from RoutesInterfaceIn import *

##################################### AppRoutes for LogBook #############################################################


# Add new logbook to a project based on the logged in user
@app.route("/add_new_logbook", methods=["POST"])
@cross_origin()
@jwt_required()
def add_new_logbook():
    if request.method == "POST":
        data = request.get_json()
        user_id = get_jwt_identity()['userId']
        project = Project.query.get_or_404(data["project_id"])
        newLogBook = LogBook(logBookTitle=data["logBookTitle"], logBookColor = data["logBookColor"], logBookDescription=data["logBookDescription"], user = user_id, project_id = data["project_id"])
        project.logbooks.append(newLogBook)
        db.session.add(newLogBook)
        db.session.commit()
        return jsonify(LogBook.serialize(newLogBook))
    

# Get all logbooks in the database
@app.route("/get_all_logbooks", methods=["GET"])
@cross_origin()
def get_all_logbooks():
    if request.method == "GET":
        logbook = []
        logbooks = LogBook.query.all()
        for l in logbooks:
            logbook.append(LogBook.serialize(l))
        return jsonify(logbook)
    

# Get, edit or delete a specific logbook
@app.route("/logbook/<int:logbook_id>", methods=["GET", "PUT", "DELETE"])
@cross_origin()
def get_logbook(logbook_id):
    if request.method == "GET":
        logbook = LogBook.query.get_or_404(logbook_id)
        return jsonify(LogBook.serialize(logbook))
    elif request.method == "PUT":
        data = request.get_json()
        logbook = LogBook.query.get_or_404(logbook_id)
        keys_list = data.keys()
        if 'logBookTitle' in keys_list:
            logbook.logBookTitle = data["logBookTitle"]
        if 'logBookDescription' in keys_list:
            logbook.logBookDescription = data["logBookDescription"]
        if 'logBookColor' in keys_list:
            logbook.logBookColor = data["logBookColor"]
        db.session.commit()
        return jsonify(LogBook.serialize(logbook))
    elif request.method == "DELETE":
        logbook = LogBook.query.get_or_404(logbook_id)
        db.session.delete(logbook)
        db.session.commit()
        return jsonify(LogBook.serialize(logbook))
    
    
# Get all logbooks on a specific project
@app.route("/get_logbooks_on_project/<int:project_id>", methods=["GET"])
@cross_origin()
def get_logbooks_on_project(project_id):
    if request.method == "GET":
        project = Project.query.get_or_404(project_id)
        logbook = []
        for l in project.logbooks:
            temp = LogBook.serialize(l)
            userName = User.query.get_or_404(l.user).name
            temp["userName"] = userName
            logbook.append(temp)
        return jsonify(logbook)