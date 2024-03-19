FROM node
WORKDIR /app
COPY package*.json ./
RUN apt-get update
RUN npm install
COPY . .
EXPOSE 3000
EXPOSE 6379
EXPOSE 8080
CMD npm start