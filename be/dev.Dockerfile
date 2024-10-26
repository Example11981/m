FROM node:20-alpine
RUN mkdir -p /app/be
WORKDIR /app/be
COPY package*.json .
RUN npm install -g nodemon
RUN npm install
COPY . .

EXPOSE 3000

# FROM node:20-alpine
# WORKDIR /app
# COPY package*.json .
# RUN npm install --production
# COPY . .
# # RUN npm install -g nodemon
# CMD ["node", "server.js"]
# EXPOSE 3000