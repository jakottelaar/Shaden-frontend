FROM node:20.11.0-alpine3.19 as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000
CMD [ "npm", "run", "dev" ]