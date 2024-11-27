FROM node:20-slim

WORKDIR /usr/divaclient

COPY package.json package-lock.json ./

RUN npm install

COPY src ./src
COPY vite.config.ts tsconfig.json server.ts ./

RUN npm run build

CMD ["npm", "run", "start"]