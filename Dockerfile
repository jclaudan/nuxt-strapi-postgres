# Dockerfile
FROM node:14.17.1-alpine3.12 as base

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./
EXPOSE 3000

FROM base as production
ENV NODE_ENV=production
RUN yarn install --frozen-lockfile --ignore-engines
COPY . .
CMD [ "yarn", "start" ]

FROM base as dev
ENV NODE_ENV=development
RUN yarn install --ignore-engines
COPY . .
CMD [ "yarn", "dev" ]