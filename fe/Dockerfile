FROM node:20-alpine as build
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.27
COPY --from=build /app/build /var/www/html/
# COPY ./build /var/www/html/
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# rm -r build
# npm run build