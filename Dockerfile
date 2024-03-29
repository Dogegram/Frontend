FROM node:14.20.0
WORKDIR /app/deploy
COPY . .
RUN apt-get update
RUN npm install && npm run build
CMD [ "npm", "run", "server" ]
