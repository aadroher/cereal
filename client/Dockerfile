FROM node:18.12-alpine

RUN mkdir -p /cereal/client

WORKDIR /cereal/client
COPY package.json /cereal/client/package.json
COPY yarn.lock /cereal/client/yarn.lock

RUN yarn
COPY . /cereal/client

