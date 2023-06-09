# admin
FROM nginx:1.25.0-alpine AS admin-service
WORKDIR /opt/nestjs-blog/apps/admin

COPY packages/admin/dist .
COPY nginx.docker.conf /etc/nginx/conf.d/default.conf


# client
FROM node:18.16-alpine AS client-service
WORKDIR /opt/nestjs-blog/apps/client
ENV NODE_ENV production

COPY packages/client/dist .
COPY packages/client/next.config.js .
COPY packages/client/public .
COPY packages/client/package.json .

RUN yarn --prod
CMD ["yarn","start:prod"]

# server

FROM node:18.16-alpine AS server-service
WORKDIR /opt/nestjs-blog/apps/server
ENV NODE_ENV production

COPY packages/server/dist .
COPY packages/server/package.json  .

RUN yarn --prod
CMD ["yarn", "start:prod"]
