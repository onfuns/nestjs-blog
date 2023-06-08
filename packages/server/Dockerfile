# 打包
# FROM node:18.16-alpine AS build
# WORKDIR /usr/share/server-build

# COPY package.json ./
# RUN yarn 

# COPY . .
# RUN yarn build

# 生产
FROM node:18.16-alpine AS production
WORKDIR /usr/share/server-prod
ENV NODE_ENV production

COPY package.json  ./
# 复制构建产物
#COPY --from=build /usr/share/server-build/dist ./dist
COPY dist/ ./dist
RUN yarn --prod

CMD ["yarn", "start:prod"]
