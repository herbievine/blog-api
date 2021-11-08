FROM node:latest

WORKDIR /usr/node/app


COPY --chown=node:node package.json .
COPY --chown=node:node yarn.lock .

RUN yarn --pure-lockfile

COPY --chown=node:node . .
COPY --chown=node:node .env.production .env

RUN yarn build
RUN yarn db:pull

ENV NODE_ENV production

EXPOSE 3000
CMD [ "node", "dist/main" ]

USER node