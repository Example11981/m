# FROM node:20-alpine as build
# WORKDIR /app
# COPY package*.json .
# RUN npm install
# COPY . .
# RUN npm run build

FROM nginx:1.27
# COPY --from=build /app/build /app
COPY ./build /var/www/html/
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

# rm -r build
# npm run build