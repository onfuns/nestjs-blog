> 基于 NextJS + NestJS + Mysql 开发的博客系统，支持文章发布、分类、标签、评论、角色权限等功能，适合搭建博客或学习使用。

## 预览

- 用户前台：[https://blog.coderfuns.com](https://blog.coderfuns.com)
- 管理后台：[https://blog.coderfuns.com/admin-website/login](https://blog.coderfuns.com/admin-website/login)

## 启动

分别进入各子目录启动

```bash
# 开发
$ npm run start:dev
# 生产
$ npm run start:prod
```

## 构建

可分别进入各子目录单独构建，也可以在项目根目录统一构建

```bash
# 根目录
$ npm run build:admin
$ npm run build:server
$ npm run build:client
```

## 部署

上传 `dist` 目录到服务器，同时参考 `nginx.conf` 设置代理，或自己集成 docker 启动

```bash
$ sudo npm install pm2 -g
$ cd client && npm install --production && npm run start:prod
$ cd server && npm install --production && npm run start:prod
```

#### 线上数据库配置

进入 `server`目录，新建 `.env.production` 文件，按需更改

```bash
DB_HOST = localhost
DB_USER = xxxxxx
DB_PASS = xxxxxx
DB_DATABASE = nest_blog
JWT_TOKEN = xxxxxxxxxxxx
```

## 技术栈

- **Server**： `NestJS + TypeORM + Mysql` + `TypeScript`
- **Client**： `NextJS` + `React` + `Antd` + `Mobx` + `TypeScript`
- **Admin**： `UmiJS` + `React` + `Antd` + `Mobx` + `TypeScript`

## 功能分类

#### 后台功能

- [x] 文章增删改查
- [x] 分类增删改查
- [x] 标签增删改查
- [x] 评论增删改查
- [x] 登录 token 校验
- [x] 权限增删改查
- [x] 用户增删改查
- [ ] 首页面板统计
- [ ] 权限校验

#### 前台功能

- [x] 文章展示
- [x] 分类
- [x] 评论
