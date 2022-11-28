FROM node:18.12.1-slim

RUN apt-get update
RUN apt-get install -y openssl

WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

EXPOSE 8080

CMD [ "pnpm", "start" ]