# FROM node:20-alpine AS build
# WORKDIR /app
# COPY package*.json .
# RUN npm ci
# COPY ./ .
# RUN npm start

# FROM nginx:1.27
# WORKDIR /app
# COPY ./nginx/dev.default.conf /etc/nginx/conf.d/default.conf
# COPY --from=build ./app .
