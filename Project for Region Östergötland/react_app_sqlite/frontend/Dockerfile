FROM node:18-alpine
#AS build
WORKDIR /app

COPY package.json ./
RUN npm install
#RUN npm run build
#RUN --mount


#FROM nginx:alpine
#COPY --from=build /app/build /usr/share/nginx

COPY . /app
#COPY /frontend/public/index.html /app/public/


EXPOSE 3000

CMD ["npm", "start"]

#This does not include the caching of package.json files



#----------------------------------------------------------------------------------------------------------------------------#
#----------------------------------------------------------------------------------------------------------------------------#
#----------------------------------------------------------------------------------------------------------------------------#

#from getting-started
#FROM node:18-alpine
#WORKDIR /app
#COPY . .
#RUN yarn install --production
#CMD ["node", "src/index.tsx"]
#EXPOSE 8080

#----------------------------------------------------------------------------------------------------------------------------#
#----------------------------------------------------------------------------------------------------------------------------#
#----------------------------------------------------------------------------------------------------------------------------#

#FROM python:3.8.10
#WORKDIR /app
#COPY . /app
#RUN npm install
#COPY . .
#ENV PORT=8080
#EXPOSE 8080


#from earlier year's projects
#RUN python3 -m venv /opt/venv


#RUN /opt/venv/bin/pip install pip --upgrade && \
#    /opt/venv/bin/pip install -r requirements.txt && \
#    chmod +x entrypoint.sh

#RUN mkdir static


#Berättar hur den faktiska applikationen ska köras, endast ett sådant kommando per dockerfil
#CMD ["/app/entrypoint.sh"]

#----------------------------------------------------------------------------------------------------------------------------#
#----------------------------------------------------------------------------------------------------------------------------#
#----------------------------------------------------------------------------------------------------------------------------#