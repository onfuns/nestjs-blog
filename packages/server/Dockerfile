# 分段构建

# 打包
FROM node:18.16-alpine AS build
ARG BUILD_DIR=/usr/share/server-build
WORKDIR $BUILD_DIR

COPY package.json ./
RUN yarn 

COPY . .
RUN yarn build

# 生产
FROM node:18.16-alpine AS release
ARG RELEASE_DIR=/usr/share/server-release
WORKDIR $RELEASE_DIR

COPY package.json .yarnrc .env.production ./
# 复制构建结果到当前工作区
COPY --from=build /usr/share/server-build/dist ./dist
RUN yarn --prod

CMD ["yarn", "start:prod"]
