FROM node:lts

WORKDIR /app/deploy

COPY . .

RUN apt-get update

RUN npm install 

RUN npm run build

CMD [ "npm", "run", "server" ]
