#9from earlier year's projects
FROM python:3.8.10


WORKDIR /app
COPY . /app


#RUN python3 -m venv /app/venv
#RUN /app/venv/bin/pip install -r requirements.txt
#RUN python


#WINDOWS SPECIFIC VENV
RUN /app/venv/Scripts/activate
RUN pip install -r requirements.txt


EXPOSE 5001
CMD ["python", "server.py", "fillData.py"]

#RUN /app/entrypoint.sh