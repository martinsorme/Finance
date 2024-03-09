#####################################################
#                                                   #
#                     Company 4                     #
#   Module for routes and views of Category model   #
#                                                   #
#####################################################


from RoutesInterfaceIn import *

##################################### AppRoute for adding category #############################################################
@app.route("/add_new_category", methods=["POST"])
@cross_origin()
def add_new_category():
    if request.method == "POST":
        data = request.get_json()
        if data["categoryName"] == ProjectCategory.option1.value:
            category = Category(categoryName=ProjectCategory.option1)
        if data["categoryName"] == ProjectCategory.option2.value:
            category = Category(categoryName=ProjectCategory.option2)
        if data["categoryName"] == ProjectCategory.option3.value:
            category = Category(categoryName=ProjectCategory.option3)
        if data["categoryName"] == ProjectCategory.option4.value:
            category = Category(categoryName=ProjectCategory.option4)
        if data["categoryName"] == ProjectCategory.option5.value:
            category = Category(categoryName=ProjectCategory.option5)
        if data["categoryName"] == ProjectCategory.option6.value:
            category = Category(categoryName=ProjectCategory.option6)
        if data["categoryName"] == ProjectCategory.option7.value:
            category = Category(categoryName=ProjectCategory.option7)
        if data["categoryName"] == ProjectCategory.option8.value:
            category = Category(categoryName=ProjectCategory.option8)
        if data["categoryName"] == ProjectCategory.option9.value:
            category = Category(categoryName=ProjectCategory.option9)
        if data["categoryName"] == ProjectCategory.option10.value:
            category = Category(categoryName=ProjectCategory.option10)
        if data["categoryName"] == ProjectCategory.option11.value:
            category = Category(categoryName=ProjectCategory.option11)
        if data["categoryName"] == ProjectCategory.option12.value:
            category = Category(categoryName=ProjectCategory.option12)
        if data["categoryName"] == ProjectCategory.option13.value:
            category = Category(categoryName=ProjectCategory.option13)
        if data["categoryName"] == ProjectCategory.option14.value:
            category = Category(categoryName=ProjectCategory.option14)
        if data["categoryName"] == ProjectCategory.option15.value:
            category = Category(categoryName=ProjectCategory.option15)
        if data["categoryName"] == ProjectCategory.option16.value:
            category = Category(categoryName=ProjectCategory.option16)
        if data["categoryName"] == ProjectCategory.option17.value:
            category = Category(categoryName=ProjectCategory.option17)
        if data["categoryName"] == ProjectCategory.option18.value:
            category = Category(categoryName=ProjectCategory.option18)
        if data["categoryName"] == ProjectCategory.option19.value:
            category = Category(categoryName=ProjectCategory.option19)
        if data["categoryName"] == ProjectCategory.option20.value:
            category = Category(categoryName=ProjectCategory.option20)
        if data["categoryName"] == ProjectCategory.option21.value:
            category = Category(categoryName=ProjectCategory.option21)
        if data["categoryName"] == ProjectCategory.option22.value:
            category = Category(categoryName=ProjectCategory.option22)
        if data["categoryName"] == ProjectCategory.option23.value:
            category = Category(categoryName=ProjectCategory.option23)
        if data["categoryName"] == ProjectCategory.option24.value:
            category = Category(categoryName=ProjectCategory.option24)
        if data["categoryName"] == ProjectCategory.option25.value:
            category = Category(categoryName=ProjectCategory.option25)
        if data["categoryName"] == ProjectCategory.option26.value:
            category = Category(categoryName=ProjectCategory.option26)
        if data["categoryName"] == ProjectCategory.option27.value:
            category = Category(categoryName=ProjectCategory.option27)
        if data["categoryName"] == ProjectCategory.option28.value:
            category = Category(categoryName=ProjectCategory.option28)
        if data["categoryName"] == ProjectCategory.option29.value:
            category = Category(categoryName=ProjectCategory.option29)
        if data["categoryName"] == ProjectCategory.option30.value:
            category = Category(categoryName=ProjectCategory.option30)
        if data["categoryName"] == ProjectCategory.option31.value:
            category = Category(categoryName=ProjectCategory.option31)
        if data["categoryName"] == ProjectCategory.option32.value:
            category = Category(categoryName=ProjectCategory.option32)
        if data["categoryName"] == ProjectCategory.option33.value:
            category = Category(categoryName=ProjectCategory.option33)
        if data["categoryName"] == ProjectCategory.option34.value:
            category = Category(categoryName=ProjectCategory.option34)
        if data["categoryName"] == ProjectCategory.option35.value:
            category = Category(categoryName=ProjectCategory.option35)
        if data["categoryName"] == ProjectCategory.option36.value:
            category = Category(categoryName=ProjectCategory.option36)
        if data["categoryName"] == ProjectCategory.option37.value:
            category = Category(categoryName=ProjectCategory.option37)
        if data["categoryName"] == ProjectCategory.option38.value:
            category = Category(categoryName=ProjectCategory.option38)
        if data["categoryName"] == ProjectCategory.option39.value:
            category = Category(categoryName=ProjectCategory.option39)
        if data["categoryName"] == ProjectCategory.option40.value:
            category = Category(categoryName=ProjectCategory.option40)    
        if data["categoryName"] == ProjectCategory.option41.value:
            category = Category(categoryName=ProjectCategory.option41)
        if data["categoryName"] == ProjectCategory.option42.value:
            category = Category(categoryName=ProjectCategory.option42)
        if data["categoryName"] == ProjectCategory.option43.value:
            category = Category(categoryName=ProjectCategory.option43)
        if data["categoryName"] == ProjectCategory.option44.value:
            category = Category(categoryName=ProjectCategory.option44)
        if data["categoryName"] == ProjectCategory.option45.value:
            category = Category(categoryName=ProjectCategory.option45)
        if data["categoryName"] == ProjectCategory.option46.value:
            category = Category(categoryName=ProjectCategory.option46)
        
        db.session.add(category)
        db.session.commit()
        return jsonify(Category.serialize(category))


@app.route("/get_all_categories", methods=["GET"])
@cross_origin()
def add_newcategory():
    if request.method == "GET":
        category = []
        categories = Category.query.all()
        for c in categories:
            category.append(Category.serialize(c))
        return jsonify(category)
