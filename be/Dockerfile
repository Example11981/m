# Dockerfile for productino
FROM node:20-alpine
WORKDIR /app
COPY package*.json .
RUN npm install --production
COPY . .
# RUN npm install -g nodemon
CMD ["node", "server.js"]
EXPOSE 3000