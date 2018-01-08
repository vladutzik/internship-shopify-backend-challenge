FROM node:8.9.4

WORKDIR /app

COPY . .

RUN npm install