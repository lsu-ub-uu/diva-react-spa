FROM node:20-slim

WORKDIR /usr/divaclient

COPY package.json package-lock.json ./

RUN npm install

COPY app ./app
COPY vite.config.ts react-router.config.ts tsconfig.json server.ts ./

ARG BASE_PATH

ENV BASE_PATH=$BASE_PATH
RUN npm run build

CMD ["npm", "run", "start"]