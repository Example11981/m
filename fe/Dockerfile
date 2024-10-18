# FROM node:20-alpine as build
# WORKDIR /app
# COPY package*.json .
# RUN npm install
# COPY . .
# RUN npm run build

FROM nginx AS production
WORKDIR /app
# COPY --from=build /app/build /app
COPY ./build /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# rm -r build
# npm run build