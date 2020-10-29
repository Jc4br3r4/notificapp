ARG stage=dev

FROM node:12.8-alpine as builder
ENV TERM xterm

RUN npm install yarn

RUN apk update && apk upgrade && \
  apk add --no-cache bash git openssh gcc musl-dev make g++ python

RUN yarn global add  @angular/cli@9.1.12

RUN mkdir ./frontend
COPY . ./frontend

WORKDIR ./frontend

# expose port
EXPOSE 4200

# start app
CMD ["ng",  "serve", "--host", "0.0.0.0"]

