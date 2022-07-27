FROM node:16.16.0-alpine3.15

ADD . /app

WORKDIR /app

RUN npm install 

EXPOSE 3000

CMD ["npm", "run", "start"]