FROM node:20-alpine AS base

RUN mkdir -p /app/fe
WORKDIR /app/fe

COPY ./fe/package*.json .
RUN npm install
COPY ./fe .

WORKDIR /app
COPY ./be/package*.json .
RUN npm install -g nodemon
RUN npm install
COPY ./be .

FROM mongo:noble

EXPOSE 3000 4200