#####################################################
#                                                   #
#                     Company 4                     #
#   Module for routes and views of Rating model     #
#                                                   #
#####################################################


from RoutesInterfaceIn import *

##################################### AppRoute for rating #############################################################

# Add new rating
# Faulty because it does not check if the user has already rated their day that day, so can result in multiple ratings per user per day
@app.route("/add_new_rating", methods=["POST"])
@cross_origin()
@jwt_required()
def add_new_rating():
    if request.method == "POST":
        user_id = get_jwt_identity()['userId']
        data = request.get_json()
        rating = Rating(rating=data["rating"],
                        comment=data["comment"], user=user_id)
        db.session.add(rating)
        db.session.commit()
        return jsonify(rating.serialize())