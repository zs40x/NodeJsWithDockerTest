FROM node:8-alpine

WORKDIR /code

RUN npm install -g nodemon@"~1.18.2"
#RUN npm install -g body-parser@"~1.8.3"

COPY package.json /code/package.json
RUN npm install && npm ls
RUN mv /code/node_modules /node_modules

COPY . /code

CMD ["npm", "start"]