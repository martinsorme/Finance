##########################################
#                                        #
#               Company 4                #
#   Configuration for celery and redis   #
#                                        #
##########################################


from db import app
from celery import Celery
from celery.schedules import crontab


#configure redis url for its server
REDIS_APP = 'redis://localhost:6379/0'
app.config['CELERY_BROKER_URL'] = REDIS_APP
app.config['result_backend'] = REDIS_APP
app.config['CELERY_BROKER_CONNECTION_RETRY_ON_STARTUP'] = True

#configure celery
celery = Celery(app.name, broker=app.config['CELERY_BROKER_URL'])
celery.conf.update(app.config)

#configure celery beat and import task from CeleryConfig
from CeleryTasks import check_for_new_child_measurement

celery.conf.beat_schedule = {
    'check_for_new_child_measurement': {
        'task': 'CeleryConfig.check_for_new_child_measurement',
        'schedule': crontab(minute=0, hour=8), #run every day at 8:00
    },
}