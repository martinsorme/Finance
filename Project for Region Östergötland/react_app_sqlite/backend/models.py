##########################################
#                                        #
#               Company 4                #
#  Models for database and flask server  #
#                                        #
##########################################


from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from db import db, bcrypt
from enum import Enum
from datetime import datetime
from sqlalchemy import Column, String


# Enum classes, Role, ProjectRole, statusProject, statusTask --Felix
class ProjectCategory(Enum):
    option1 = 'Akutvård'
    option2 = 'Anamnestagning'
    option3 = 'Arbetsmiljö'
    option4 = 'Barn- och ungdomshälsa'
    option5 = 'Cancersjukdomar'
    option6 = 'Endokrina sjukdomar'
    option7 = 'Fallrisk'
    option8 = 'Hemsjukvård'
    option9 = 'Hjärt- och kärlsjukdomar'
    option10 = 'Hud- och könssjukdomar'
    option11 = 'Infektionssjukdomar'
    option12 = 'Kirurgi och plastikkirurgi'
    option13 = 'Kompentensutveckling'
    option14 = 'Kvinnosjukdomar och förlossning'
    option15 = 'Levnadsvanor'
    option16 = 'Lung- och allergisjukdomar'
    option17 = 'Mag- och tarmsjukdomar'
    option18 = 'Medicinsk diagnostik'
    option19 = 'Munhälsa'
    option20 = 'Nervsystemets sjukdomar'
    option21 = 'Njur- och urinvägssjukdomar'
    option22 = 'Nutrition'
    option23 = 'Omvårdnad'
    option24 = 'Palliativ vård'
    option25 = 'Patientinformation'
    option26 = 'Patientmedverkan'
    option27 = 'Patientsäkerhet'
    option28 = 'Perioperativ vård, intensivvård och transplantation'
    option29 = 'Personcentrerad vård'
    option30 = 'Primärvård'
    option31 = 'Psykisk hälsa'
    option32 = 'Rehabilitering, habilitering och försäkringsmedicin'
    option33 = 'Reumatiska sjukdomar'
    option34 = 'Rutiner'
    option35 = 'Rörelseorganens sjukdomar'
    option36 = 'Slutenvård'
    option37 = 'Specialistvård'
    option38 = 'Statustagning'
    option39 = 'Sällsynta sjukdomar'
    option40 = 'Tandvård'
    option41 = 'Utbildning'
    option42 = 'Vårddokumentation'
    option43 = 'Vårdhygien'
    option44 = 'Ögonsjukdomar'
    option45 = 'Öppenvård'
    option46 = 'Övrigt'




class Role(Enum):
    user = 'User'
    admin = 'Admin'


class ProjectRole(Enum):
    team_Leader = 'Team-Leader'
    team_Member = 'Team-Member'
    viewer = 'Viewer'


class statusProject(Enum):
    utkast = 'Utkast'
    not_yet_started = 'Not yet Started'
    p = "P"
    d = "D"
    s = "S"
    a = "A"
    finished = 'Finished'
    archived = 'Archived'


class statusTask(Enum):
    not_yet_started = 'Not yet Started'
    ongoing = "Ongoing"
    finished = 'Finished'

class statusSuggestion(Enum):
    draft = 'Draft'
    published = 'Published'
    archived = 'Archived'    


project_category = db.Table('project_category',
                            db.Column('project_id', db.Integer, db.ForeignKey(
                                'project.projectId'), primary_key=True),
                            db.Column('category_id', db.Integer, db.ForeignKey('category.categoryId'), primary_key=True))


suggestion_category = db.Table('suggestion_category',
                            db.Column('suggestion_id', db.Integer, db.ForeignKey(
                                'suggestion.suggestionId'), primary_key=True),
                            db.Column('category_id', db.Integer, db.ForeignKey('category.categoryId'), primary_key=True))

# Many to many users and projects --Felix
user_task = db.Table('user_task',
                     db.Column('user_id', db.Integer, db.ForeignKey(
                         'user.userId'), primary_key=True),
                     db.Column('task_id', db.Integer, db.ForeignKey('task.taskId'), primary_key=True))

user_project = db.Table('user_project',
                        db.Column('user_id', db.Integer, db.ForeignKey(
                            'user.userId'), primary_key=True),
                        db.Column('project_id', db.Integer, db.ForeignKey(
                            'project.projectId'), primary_key=True),
                        db.Column('user_role', db.Enum(ProjectRole)))



# Classes: User, Idea, Notification, Project, Documnet, Task --Felix


class Category(db.Model):
    categoryId = db.Column(db.Integer, primary_key=True)
    categoryName = db.Column(db.Enum(ProjectCategory), nullable=False)
    projects = db.relationship('Project', secondary=project_category, back_populates="categories")
    suggestions = db.relationship('Suggestion', secondary=suggestion_category, back_populates="categories")

    def serialize(self):
        return dict(categoryId=self.categoryId, categoryName=self.categoryName.value)


class User(db.Model):
    userId = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    getEmail = db.Column(db.Boolean, nullable=False, default=True)
    phoneNumber = db.Column(db.String, nullable=True) 
    password_hash = db.Column(db.String, nullable=False)
    # Path to picture
    profileIcon = db.Column(db.String, nullable=True)
    unit = db.Column(db.String, nullable=True)
    jobTitle = db.Column(db.String, nullable=True)
    role = db.Column(db.Enum(Role), nullable=False, default=Role.user)
    suggestions = db.relationship('Suggestion', backref='user', lazy=True)
    tasks = db.relationship("Task", secondary=user_task,
                            back_populates="users")
    created_projects = db.relationship('Project', backref='user', lazy=True)

    def serialize(self):
        idea = []
        c_p = []
        for project in self.created_projects:
            c_p.append(Project.serialize(project))
        for suggestion in self.suggestions:
            idea.append(Suggestion.serialize(suggestion))
        return dict(userId=self.userId, name=self.name, email=self.email, profileIcon=self.profileIcon, unit=self.unit,
                    role=str(self.role.value), jobTitle=self.jobTitle, notifications=self.notifications, suggestions=idea,
                    created_projects=c_p, phoneNumber=self.phoneNumber)

    def serialize(self):
        return dict(userId=self.userId, name=self.name, email=self.email, profileIcon=self.profileIcon, unit=self.unit,
                    role=str(self.role.value), jobTitle=self.jobTitle, phoneNumber=self.phoneNumber)

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(
            password).decode('utf-8')


class Project(db.Model):
    projectId = db.Column(db.Integer, primary_key=True)
    creator_id = db.Column(db.Integer, db.ForeignKey(
        'user.userId'), nullable=False)
    categories = db.relationship('Category', secondary=project_category,
                                 lazy='subquery', back_populates="projects")
    title = db.Column(db.String, nullable=False)
    users = db.relationship('User', secondary=user_project,
                            lazy='subquery', backref=db.backref('user_project', lazy=True))
    tasks = db.relationship('Task', backref='project', lazy=True)
    logbooks = db.relationship('LogBook', lazy=True, backref="project")
    importance = db.Column(db.String, nullable=False)
    difference = db.Column(db.String, nullable=False)
    requirements = db.Column(db.String, nullable=False)
    # Maybe have a separate class for this  --Felix
    measurementsChildren = db.relationship('Measurementparent', backref='project', lazy=True)
    unit = db.Column(db.String, nullable=True)
    how_often = db.Column(db.String, nullable=True)
    # timeLine = db.Column(db.String, nullable = True) ##insert dates with , ex. "2023-04-10, 2023-05-10" --Felix
    status = db.Column(db.Enum(statusProject), nullable=False,
                       default=statusProject.not_yet_started)
    deadline = db.Column(db.DateTime, nullable=True)
    startTime = db.Column(db.DateTime, nullable=True)
    links = db.relationship('Link', backref='project', lazy=True)

    evaluationExplanation = db.Column(db.String, nullable=True)
    evaluationSummary = db.Column(db.String, nullable=True)
    evaluation = db.Column(db.String, nullable=True)

    def serialize(self):
        task = []
        user = []
        c = []
        for tasks in self.tasks:
            task.append(Task.serialize(tasks))

        # Needs to get the role of the user
        for users in self.users:
            temp_user_project = db.session.query(user_project).filter_by(
                user_id=users.userId, project_id=self.projectId).first()
            role = temp_user_project.user_role
            dic = User.serialize(users)
            dic['projectRole'] = str(role.value)
            user.append(dic)

        for category in self.categories:
            c.append(Category.serialize(category))

        return dict(projectId=self.projectId, title=self.title, users=user, tasks=task, creator_id=self.creator_id,
                    importance=self.importance, difference=self.difference, requirements=self.requirements,
                    unit=self.unit, how_often=self.how_often, status=str(self.status.value), deadline=self.deadline,
                    categories=c, startTime=self.startTime, evaluationExplanation=self.evaluationExplanation, evaluation=self.evaluation, evaluationSummary=self.evaluationSummary)

    # Function that populates table user_project_task_role:
    def populate_user_project_role(self, user, role):

        new_row = user_project.insert().values(
            user_id=user.userId, project_id=self.projectId, user_role=role)
        db.session.execute(new_row)
        db.session.commit()


class Task(db.Model): 
    taskId = db.Column(db.Integer, primary_key=True)
    taskName = db.Column(db.String, nullable = False)
    taskDescription = db.Column(db.String, nullable = False)
    status = db.Column(db.Enum(statusTask), nullable = False, default=statusTask.not_yet_started)
    project_id = db.Column(db.Integer, db.ForeignKey('project.projectId'), nullable=False)
    users = db.relationship("User", secondary=user_task, back_populates="tasks")
    result = db.Column(db.String, nullable = True)

    def serialize(self): 
        return dict(taskId = self.taskId, taskName = self.taskName, taskDescription = self.taskDescription,
                    status = str(self.status.value), project_id = self.project_id, result = self.result, users = [u.serialize() for u in self.users])


class BaseNotification(db.Model):
    __tablename__ = 'base_notification'
    notificationId = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    userId = db.Column(db.Integer, db.ForeignKey('user.userId'))
    read = db.Column(db.Boolean, default=False)

    type = Column(String)

    __mapper_args__ = {
        'polymorphic_on': type,
    }

    def serialize(self):
        pass

class Notification(BaseNotification):
    __tablename__ = 'notification'
    projectId = db.Column(db.Integer, db.ForeignKey('project.projectId'))

    __mapper_args__ = {
        'polymorphic_identity': 'notification'
    }

    def serialize(self):
        return dict(notificationId=self.notificationId, message=self.message, timestamp=self.timestamp, userId=self.userId, projectId=self.projectId)

class AdminNotification(BaseNotification):
    __tablename__ = 'admin_notification'
    suggestionId = db.Column(db.Integer, db.ForeignKey('suggestion.suggestionId'))

    __mapper_args__ = {
        'polymorphic_identity': 'admin_notification'
    }

    def serialize(self):
        return dict(notificationId=self.notificationId, message=self.message, timestamp=self.timestamp, userId=self.userId, suggestionId=self.suggestionId)

class Link(db.Model):
    linkId = db.Column(db.Integer, primary_key=True)
    linkTitle = db.Column(db.String, nullable=False)
    url = db.Column(db.String, nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey(
        'project.projectId'), nullable=False)

    def serialize(self):
        return dict(id=self.linkId, title=self.linkTitle, url = self.url, project_id=self.project_id)

class Suggestion(db.Model):
    suggestionId = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    categories = db.relationship('Category', secondary=suggestion_category,
                                    lazy='subquery', back_populates="suggestions")
    descriptionImportance = db.Column(db.String, nullable=False)
    descriptionImpact = db.Column(db.String, nullable=True)
    descriptionRequirements = db.Column(db.String, nullable=True)
    status = db.Column(db.Enum(statusSuggestion), nullable=False,
                       default=statusSuggestion.draft)

    creationTime = db.Column(db.DateTime, default=datetime.utcnow)
    creator = db.Column(db.Integer, db.ForeignKey(
        'user.userId'), nullable=False)

    def serialize(self):
        return dict(suggestionId=self.suggestionId, name=self.name,
                    descriptionImportance=self.descriptionImportance,
                    descriptionImpact=self.descriptionImpact,
                    descriptionRequirements=self.descriptionRequirements, 
                    status=str(self.status.value), creationTime=self.creationTime, 
                    creator=self.creator, categories=[c.serialize() for c in self.categories])


class Rating(db.Model):
    ratingId = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    comment = db.Column(db.String, nullable=True)
    user = db.Column(db.Integer, db.ForeignKey('user.userId'), nullable=False)

    def serialize(self):
        return dict(ratingId=self.ratingId, rating=self.rating, comment=self.comment, user=self.user)
    
class LogBook(db.Model):
    __tablename__ = 'logbook'
    logBookId = db.Column(db.Integer, primary_key=True)
    logBookTitle = db.Column(db.String, nullable=False)
    logBookColor = db.Column(db.String, nullable=False)
    logBookDescription = db.Column(db.String, nullable=True)
    user = db.Column(db.Integer, db.ForeignKey('user.userId'), nullable=False)
    timeStamp = db.Column(db.DateTime, default=datetime.utcnow)
    project_id = db.Column(db.Integer, db.ForeignKey('project.projectId'), nullable=False)

    def serialize(self):
        return dict(logBookId=self.logBookId, logBookTitle=self.logBookTitle, logBookColor=self.logBookColor, logBookDescription=self.logBookDescription, user=self.user, timeStamp=self.timeStamp, project_id=self.project_id)

class Measurementparent(db.Model):
    measurementParentId = db.Column(db.Integer, primary_key=True)
    measurementParentName = db.Column(db.String, nullable=False)
    measurementParentUnit = db.Column(db.String, nullable=False)
    measurementParentFrequencyAmount = db.Column(db.Integer, nullable=False)
    measurementParentFrequencyInterval = db.Column(db.Integer, nullable=False)
    measurementChilds = db.relationship('Measurementchild', backref='measurementparent', lazy=True)
    project_id = db.Column(db.Integer, db.ForeignKey('project.projectId'), nullable=False)

    def serialize(self):
        return dict(measurementId=self.measurementParentId, name=self.measurementParentName, unit=self.measurementParentUnit, children=[m.serialize() for m in self.measurementChilds], project_id=self.project_id, frequencyAmount=self.measurementParentFrequencyAmount, frequencyInterval=self.measurementParentFrequencyInterval)
    
class Measurementchild(db.Model):
    measurementChildId = db.Column(db.Integer, primary_key=True)
    measurementChildValue = db.Column(db.Float, nullable=False)
    measurementChildTime = db.Column(db.DateTime, default=datetime.utcnow)
    measurementParentId = db.Column(db.Integer, db.ForeignKey('measurementparent.measurementParentId'), nullable=False)

    def serialize(self):
        date = self.measurementChildTime.strftime("%Y-%m-%d")
        return dict(measurementId=self.measurementChildId, value=self.measurementChildValue, time=date)