##########################################
#                                        #
#               Company 4                #
#   Flask server for backend of project  #
#                                        #
##########################################


from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import sessionmaker
from sqlalchemy import select

import os

#Create path for celery variable from db
from db import celery, Celery
from RoutesPackage import *

#Run application
if __name__ == '__main__': 
    with app.app_context():
        db.create_all()   
    app.run(debug=True, port = 5001)
