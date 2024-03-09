#####################################################
#                                                   #
#                     Company 4                     #
#     Module for routes and views of User model     #
#                                                   #
#####################################################


from RoutesInterfaceIn import *
from datetime import datetime, timedelta

##################################### AppRoute for user #############################################################


#Add new user
#Obsolete method, use signup instead
@app.route("/add_new_user", methods=["POST"])
@cross_origin()
def add_user():
    if request.method == "POST":
        data = request.get_json()
        keys_list = data.keys()
        if 'role' in keys_list:
            if data['role'] == Role.user.value:
                newUser = User(name=data["name"], email=data["email"],
                               role=Role.user, unit=data["unit"], jobTitle=data["jobTitle"])
            else:
                newUser = User(name=data["name"], email=data["email"],
                               role=Role.admin, unit=data["unit"], jobTitle=data["jobTitle"])
        else:
            newUser = User(name=data["name"], email=data["email"],
                           unit=data["unit"], jobTitle=data["jobTitle"])

        db.session.add(newUser)
        db.session.commit()
        return jsonify(User.serialize(newUser))

#Get all users
@app.route("/get_all_users", methods=["GET"])
@cross_origin()
def get_users():
    if request.method == 'GET':
        user = []
        users = User.query.all()
        for u in users:
            user.append(User.serialize(u))
        return jsonify(user)

#Get or edit a specific user
#DELETE is not properly implemented because a user should not be deleted
@app.route("/user/<int:user_id>", methods=["GET", "PUT", "DELETE"])
@cross_origin()
def edit_delete_get_user(user_id):
    user = User.query.get_or_404(user_id)
    if request.method == 'GET':
        return jsonify([User.serialize(user)])
    elif request.method == 'PUT':
        data = request.get_json()
        keys_list = data.keys()
        if 'name' in keys_list:
            user.name = data["name"]
        if 'email' in keys_list:
            user.email = data["email"]
        if 'phoneNumber' in keys_list:
            if len(data["phoneNumber"]) == 9:
                user.phoneNumber = '+46' + data["phoneNumber"]
            if len(data["phoneNumber"]) == 10:
                user.phoneNumber = data["phoneNumber"]
        if 'profileIcon' in keys_list:
            user.profileIcon = data["profileIcon"]
        if 'unit' in keys_list:
            user.unit = data['unit']
        if 'jobTitle' in keys_list:
            user.jobTitle = data["jobTitle"]
        if 'role' in keys_list:
            if data['role'] == 'User':
                user.role = Role.user
            else:
                user.role = Role.admin
        db.session.commit()
        return jsonify([User.serialize(user)])
    elif request.method == 'DELETE':
        db.session.delete(user)
        db.session.commit()
        return jsonify("DELETE COMPLETE")

################################## AppRoute for Authentication #########################################################

#Signup a new user
@app.route("/signup", methods=["POST"])
def signup():
    if request.method == "POST":
        data = request.get_json()
        if not data["email"]:
            return jsonify({"message": "Email is required"}), 400           #Handle errors if information is not provided
        if not data["password"]:
            return jsonify({"message": "Password is required"}), 400
        if not data["name"]:
            return jsonify({"message": "Name is required"}), 400
        existing_user = User.query.filter_by(email=data["email"]).first()
        if existing_user:
            return jsonify({"message": "Email already in use"}), 400
        keys_list = data.keys()
        if 'role' in keys_list:
            if data['role'] == Role.admin.value:                            #Default role is user
                role = Role.admin
            else:
                role = Role.user

        phoneNumber=None
        if 'phoneNumber' in keys_list:
            if len(data["phoneNumber"]) == 9:
                phoneNumber = '+46' + data["phoneNumber"]                   #Add country code if not provided
            elif len(data["phoneNumber"]) == 10:
                phoneNumber = data["phoneNumber"]

        new_user = User(
            name=data["name"],
            email=data["email"],
            role=role,
            unit=data["unit"],
            jobTitle=data["jobTitle"],
            phoneNumber=phoneNumber,

        )
        new_user.set_password(data["password"])                             #Hash password
        db.session.add(new_user)
        db.session.commit()
        return jsonify(new_user.serialize()), 200


#Login a user
@app.route("/login", methods=["POST"])
@cross_origin()
def login():
    if request.method == "POST":
        data = request.get_json()
        user = User.query.filter_by(email=data["email"]).first()
        password = data["password"]
        if user:
            if bcrypt.check_password_hash(user.password_hash, password):
                expiration_delta = timedelta(hours=2)                       #Set expiration time for token to 2 hours
                token = create_access_token(identity=user.serialize(), expires_delta=expiration_delta)
                return jsonify(dict(user.serialize(), token=token))
            else:
                return jsonify({"message": "Invalid password"}), 401
        else:
            return jsonify({"message": "Invalid email"}), 401
        

#Get logged in user to not use information in session storage in frontend (security reasons)
@app.route("/logged_in_user", methods=["GET"])
@cross_origin()
@jwt_required()
def logged_in_user():
    if request.method == "GET":
        user = get_jwt_identity()
        user = user['userId']
        user = User.query.get_or_404(user)
        return jsonify(user.serialize())
