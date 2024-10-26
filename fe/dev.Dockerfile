FROM node:20-alpine AS build
RUN mkdir -p /app/fe
WORKDIR /app/fe
COPY package*.json .
RUN npm install

COPY . .
EXPOSE 4200

# FROM nginx:1.27
# WORKDIR /app/fe
# COPY ./nginx/dev.default.conf /etc/nginx/conf.d/default.conf
# COPY --from=build . .
