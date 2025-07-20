FROM node:24-alpine AS base

WORKDIR /app

ENV PATH=/app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install

COPY . /app

FROM node:24-alpine AS production

WORKDIR /app

ENV \
  PATH=/app/node_modules/.bin:$PATH \
  NODE_ENV=production

COPY package*.json ./

RUN npm install --only=production

COPY --from=base /app/dist /app/dist

USER node

CMD ["npm", "start"]

FROM base AS development

ENV NODE_ENV=development

CMD ["npm", "run", "dev"]