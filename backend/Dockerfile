FROM node:16-alpine
WORKDIR /usr/src/app

RUN apk add --no-cache dumb-init
COPY ./package.json ./yarn.lock  ./
RUN yarn install --frozen-lockfile

COPY ./ ./

ENV NODE_ENV=production
EXPOSE 3030

CMD ["dumb-init", "node", "server.js"]