FROM node:16
MAINTAINER Tiago "tiagofdev@gmail.com"
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -g npm@8.19.2
RUN npm install -g @angular/cli
RUN npm install graphology sigma graphology-layout-force
RUN npm install
RUN npm fund
COPY . ./
RUN npm run build
EXPOSE $PORT
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 app/main:app --host 0.0.0.0
CMD [ "node", "server.js" ]
