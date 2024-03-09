#####################################################
#                                                   #
#                     Company 4                     #
#     Module for routes and views of Link model     #
#                                                   #
#####################################################


from RoutesInterfaceIn import *

##################################### AppRoute for links #############################################################
    

# Add new link to a project
@app.route("/add_new_link/<int:project_id>", methods=['POST'])
@cross_origin()
def add_new_link(project_id):
    if request.method == 'POST':
        data = request.get_json()
        project = Project.query.get_or_404(project_id)
        newLink = Link(linkTitle=data["title"], url=data["url"], project_id = project_id)
        project.links.append(newLink)
        db.session.add(newLink)
        db.session.commit()
        return jsonify(Link.serialize(newLink))
    

# Get all links in a project
@app.route("/get_all_links_on_project/<int:project_id>", methods=['GET'])
@cross_origin()
def get_all_links_on_project(project_id):
    if request.method == 'GET':
        links = []
        project = Project.query.get_or_404(project_id)
        links = project.links
        return jsonify([Link.serialize(link) for link in links])
    

# Get, edit or delete a specific link    
@app.route("/link/<int:link_id>", methods=["GET", "PUT", "DELETE"])
@cross_origin()
def edit_delete_get_link(link_id):
    link = Link.query.get_or_404(link_id)
    if request.method == 'GET':
        return jsonify(Link.serialize(link))
    elif request.method == 'PUT':
        data = request.get_json()
        keys_list = data.keys()
        if 'title' in keys_list:
            link.linkTitle = data["title"]
        if 'url' in keys_list:
            link.url = data["url"]
        db.session.commit()
        return jsonify(Link.serialize(link))
    elif request.method == 'DELETE':
        db.session.delete(link)
        db.session.commit()
        return jsonify("DELETE COMPLETE")