FROM node:lts-alpine

RUN npm install yarn

RUN apk update && apk upgrade && \
  apk add --no-cache bash git openssh gcc musl-dev make g++ python

RUN mkdir ./backend

COPY . /backend

WORKDIR ./backend

EXPOSE 3000

CMD ["yarn", "start:dev"]


