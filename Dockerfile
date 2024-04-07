FROM node:latest AS build

WORKDIR /usr/src/bot

RUN apt-get update && apt-get install -y build-essential libtool autoconf automake python3 

COPY package.json ./

COPY yarn.lock ./

ENV NODE_ENV production

RUN yarn global add node-gyp

RUN yarn install --production

FROM node:21.7.2-bookworm-slim

ENV NODE_ENV production

RUN apt-get update && apt-get install -y dumb-init

USER node

WORKDIR /usr/src/bot

COPY --chown=node:node --from=build /usr/src/bot/node_modules ./node_modules

COPY --chown=node:node . ./

ENTRYPOINT ["/usr/bin/dumb-init", "--"]

CMD ["bash", "-c", "node deploy-command.js && exec node bot.js"]
