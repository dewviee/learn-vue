FROM node:current-alpine3.20

WORKDIR /usr/src/app

COPY . .

RUN npm i
RUN npm i -g serve

RUN npm run build

CMD ["serve", "-s", "./dist"]