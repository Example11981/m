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
# FROM nginx:1.27
# WORKDIR /app
# COPY --from=base . .
# COPY ./fe/nginx/dev.default.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000 4200