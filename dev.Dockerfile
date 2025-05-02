FROM node:alpine AS base 
RUN apk add openssl

WORKDIR /woof-enactus
VOLUME [ "/woof-enactus/apps/client" ]
VOLUME [ "/woof-enactus/apps/server" ]

COPY package.json .
COPY package-lock.json .
COPY packages ./packages

COPY apps/server/package.json ./apps/server/package.json
COPY apps/client/package.json ./apps/client/package.json

RUN npm install