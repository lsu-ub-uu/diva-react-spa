FROM node:20

WORKDIR /usr/divaclient

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ENV BASE_PATH=/divaclient
RUN npm run build

ENV NODE_ENV=production
CMD ["npm", "run", "start"]