FROM node:alpine

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g @angular/cli

RUN npm install

CMD ["npm", "start", "--", "--host", "0.0.0.0", "--port", "80"]