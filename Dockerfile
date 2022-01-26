FROM node:17-alpine3.14 AS development

WORKDIR /src/app

COPY package.json  package-lock.json ./

RUN npm install -g npm@latest

RUN npm install 

COPY . .

RUN npm run build

RUN npm run start:dev