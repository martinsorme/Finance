from RoutesInterfaceIn import *

##################################### AppRoute for clearing the databas #############################################################
@app.route("/clear_database", methods=["DELETE"])
@cross_origin()
def clear_database():
    if request.method == "DELETE":
        db.drop_all()
        db.create_all()
        db.session.commit()
        return jsonify("Database cleared")