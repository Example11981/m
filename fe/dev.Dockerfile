FROM node:20-alpine
RUN mkdir -p /app/fe
WORKDIR /app/fe
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 80

# FROM nginx:1.27
# WORKDIR /app/fe
# COPY ./nginx/dev.default.conf /etc/nginx/conf.d/default.conf
# COPY --from=build . .
