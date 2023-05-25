# 生产
FROM node:18.16-alpine AS production
WORKDIR /usr/share/client-prod
ENV NODE_ENV production
# 复制构建产物
COPY dist/ ./dist
# 安装依赖
RUN yarn --prod
# 启动
CMD ["yarn","start:prod"]

