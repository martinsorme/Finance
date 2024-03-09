#####################################################
#                                                   #
#                     Company 4                     #
#    Module for routes and views of Measurements    #
#                                                   #
#####################################################


from RoutesInterfaceIn import *

##################################### AppRoute for adding Measurement #############################################################


# Add new measurement "parent" to a project, meaning, not the measurement itself, but the type of measurement
@app.route("/add_new_measurement/<int:project_id>", methods=["POST"])
@cross_origin()
def add_new_measurement(project_id):

    if request.method == "POST":

        data = request.get_json()
        if data["frequencyInterval"] == "minut" or data["frequencyInterval"] =="Minut":             #Minute is only here for testing purposes, also therefore hour is not included
            interval = 60
        elif data["frequencyInterval"] == "timme" or data["frequencyInterval"] =="Timme":
            interval = 60*60
        elif data["frequencyInterval"] == "dag" or data["frequencyInterval"] =="Dag":
            interval = 60*60*24
        elif data["frequencyInterval"] == "vecka" or data["frequencyInterval"] =="Vecka":
            interval = 60*60*24*7
        elif data["frequencyInterval"] == "månad" or data["frequencyInterval"] =="Månad":
            interval = 60*60*24*30
        elif data["frequencyInterval"] == "år" or data["frequencyInterval"] =="År":
            interval = 60*60*24*365
        else:
            interval=0
        newMeasurement = Measurementparent(measurementParentName=data["name"], measurementParentUnit=data["unit"], measurementParentFrequencyAmount = data["frequencyAmount"], measurementParentFrequencyInterval = interval, project_id=project_id)
        project = Project.query.get_or_404(project_id)
        project.measurementsChildren.append(newMeasurement)       #Add the measurement to the project. The name is a bit misleading, but it is the measurement parent that is added to the project, not the measurement itself
        db.session.add(newMeasurement)
        db.session.commit()
        return jsonify(Measurementparent.serialize(newMeasurement))
    

# Get all measurement "parents" on a project
@app.route("/get_all_measurements/<int:project_id>", methods=['GET'])
@cross_origin()
def get_all_measurements(project_id):
    if request.method == 'GET':
        measurement = []
        project = Project.query.get_or_404(project_id)
        measurements = project.measurementsChildren
        for m in measurements:
            measurement.append(Measurementparent.serialize(m))
            
        return jsonify(measurement)
    

# Get, edit or delete a specific measurement "parent"
@app.route("/measurement/<int:measurement_id>", methods=["GET", "PUT", "DELETE"])
@cross_origin()
def edit_delete_get_measurement(measurement_id):
    measurement = Measurementparent.query.get_or_404(measurement_id)
    if request.method == 'GET':
        return jsonify(Measurementparent.serialize(measurement))
    elif request.method == 'PUT':
        data = request.get_json()
        keys_list = data.keys()
        if 'name' in keys_list:
            measurement.measurementParentName = data["name"]
        if 'unit' in keys_list:
            measurement.measurementParentUnit = data["unit"]
        if 'frequencyAmount' in keys_list:
            measurement.measurementParentFrequencyAmount = data["frequencyAmount"]
        if 'frequencyInterval' in keys_list:
            if data["frequencyInterval"] == "minut" or data["frequencyInterval"] =="Minut":
                interval = 60
            elif data["frequencyInterval"] == "timme" or data["frequencyInterval"] =="Timme":
                interval = 60*60
            elif data["frequencyInterval"] == "dag" or data["frequencyInterval"] =="Dag":
                interval = 60*60*24
            elif data["frequencyInterval"] == "vecka" or data["frequencyInterval"] =="Vecka":
                interval = 60*60*24*7
            elif data["frequencyInterval"] == "månad" or data["frequencyInterval"] =="Månad":
                interval = 60*60*24*30
            elif data["frequencyInterval"] == "år" or data["frequencyInterval"] =="År":
                interval = 60*60*24*365
            else:
                interval=0
            measurement.measurementParentFrequencyInterval = interval
        if 'project' in keys_list:
            measurement.project_id = data["project"]
        db.session.commit()
        return jsonify(Measurementparent.serialize(measurement))
    elif request.method == 'DELETE':
        children = measurement.measurementChilds
        for child in children:
            db.session.delete(child)
        db.session.delete(measurement)
        db.session.commit()
        return jsonify(Measurementparent.serialize(measurement))
    

# Add new measurement "child" to a measurement "parent", meaning, the actual measurement
@app.route("/add_new_measurement_child/<int:measurement_id>", methods=["POST"])
@cross_origin()
def add_new_measurement_child(measurement_id):
    
        if request.method == "POST":
    
            data = request.get_json()
            if data['date'] != "":
                date_object = datetime.strptime(data['date'], '%Y-%m-%d')
                newMeasurement = Measurementchild(measurementChildValue=data["value"], measurementChildTime=date_object, measurementParentId=measurement_id)
            else:
                newMeasurement = Measurementchild(measurementChildValue=data["value"], measurementParentId=measurement_id)
            measurement = Measurementparent.query.get_or_404(measurement_id)
            measurement.measurementChilds.append(newMeasurement)
            db.session.add(newMeasurement)
            db.session.commit()
            return jsonify(Measurementchild.serialize(newMeasurement))
        

# Get all measurement "children" on a measurement "parent"
@app.route("/get_all_measurements_child/<int:measurement_id>", methods=['GET'])
@cross_origin()
def get_all_measurements_child(measurement_id):
    if request.method == 'GET':
        measurement = []
        measurementParent = Measurementparent.query.get_or_404(measurement_id)
        measurements = measurementParent.measurementChilds
        for m in measurements:
            measurement.append(Measurementchild.serialize(m))
        return jsonify(measurement)
    
