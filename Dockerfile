FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app

COPY package.json ./

RUN npm install

COPY ./ ./
ENV NODE_ENV production
EXPOSE 3000
CMD [ "npm", "start"]