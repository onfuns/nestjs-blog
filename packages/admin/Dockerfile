# 生产
FROM nginx:1.25.0-alpine AS production
WORKDIR /usr/share/admin-prod
# 复制产物
COPY dist/ ./
# nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

