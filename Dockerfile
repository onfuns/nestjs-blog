# admin
FROM nginx:1.25.0-alpine AS admin-service
WORKDIR /opt/admin-service

COPY packages/admin/dist ./dist
COPY nginx.docker.conf /etc/nginx/conf.d/default.conf


# client
FROM node:18.16-alpine AS client-service
WORKDIR /opt/client-service
ENV NODE_ENV production

COPY packages/client/dist ./dist
COPY packages/client/next.config.js .
COPY packages/client/public ./public
COPY packages/client/package.json .

RUN yarn --prod
CMD ["yarn","start:prod"]

# server

FROM node:18.16-alpine AS server-service
WORKDIR /opt/server-service
ENV NODE_ENV production

COPY packages/server/dist ./dist
COPY packages/server/package.json  .

RUN yarn --prod
CMD ["yarn", "start:prod"]
