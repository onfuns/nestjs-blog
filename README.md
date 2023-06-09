> 基于 NextJS + NestJS + Mysql 开发的博客系统，支持文章发布、分类、标签、评论、角色权限等功能，适合搭建博客或学习使用。

## 技术栈

- **Server**： `NestJS` + `TypeORM` + `Mysql` + `TypeScript`
- **Client**： `NextJS` + `Antd` + `Mobx` + `TypeScript`
- **Admin**： `Vite` + `React` + `Antd` + `Mobx` + `TypeScript`

## 预览

#### 前台

- 地址： [https://demo.onfuns.com](https://demo.onfuns.com)

- 首页

  ![](./screenshot/前台-首页.png)

- 评论页

  ![](./screenshot/前台-评论.png)

#### 后台

- 地址：[https://demo.onfuns.com/admin/login](https://demo.onfuns.com/admin/login) (demo/a123456)

- 登录页

  ![](./screenshot/后台-登录页.png)

- 首页

  ![](./screenshot/后台-首页.png)

- 文章页

  ![](./screenshot/后台-文章页.png)

## 启动

进入 `server`、`client`、`admin` 对应目录启动：

```bash
# 开发
yarn dev
# 生产
yarn start:prod
# pm2 启动
yarn start:pm2
```

## 构建

可分别进入各子目录单独构建，也可以在项目根目录统一构建，输出目录分别为各子目录中的 `dist`。

```bash
yarn build
```

## 部署

新建数据库`nest_blog`，本地可以导入 `server` 中的初始化数据 `init.sql`，生产环境可以使用 `Navicat`数据迁移。

生产环境基于 nginx 代理，参考 `nginx.conf` 设置。同时需要设置生产环境相关配置，新建配置文件：

```bash
cd /etc && touch .blog.server.production
```

写入以下数据库配置：

```bash
DB_HOST = localhost       # 主机
DB_USER = root            # 用户
DB_PASS = 123456          # 密码
DB_DATABASE =  xxxxxxxx   # 数据库
```

#### Github Action 模式

参考根目录 `.github/workflows` 中配置，注意 `secrets.ACCESS_TOKEN` 为目标机器中的私钥，且目标机器支持密钥登录。

目标机器 `ssh` 配置如下：

```bash
# 制作密钥，一直回车，默认生成在 ~/.ssh 目录
ssh-keygen
# 生产鉴权 key
cd ~/.ssh
cat id_rsa.pub >> authorized_keys
chmod 600 authorized_keys
```

编辑 `/etc/ssh/sshd_config` 文件，如无则新增：

```bash

RSAAuthentication yes
PubkeyAuthentication yes
PermitRootLogin yes
```

重启 `ssh` 服务：

```bash
service sshd restart
```

注意：`Action` 模式依赖 `pm2` 启动，需要在部署机器上全局安装

```bash
sudo yarn global add pm2
```

#### 手动模式

进入子目录压缩打包文件上传到服务器，然后再手动安装启动：

```bash
# admin
tar -zcvf admin.tar.gz dist
# clinet
tar -zcvf client.tar.gz dist public next.config.js package.json pm2.json
# server
tar -zcvf server.tar.gz dist package.json pm2.json
```

解压参考：

```bash
mkdir -p ./server
tar -xzvf server.tar.gz -C ./server
```

## 功能

#### 后台功能

- [x] 文章管理
- [x] 分类管理
- [x] 标签管理
- [x] 评论管理
- [x] 登录鉴权
- [x] 权限管理
- [x] 用户管理
- [x] 首页面板
- [x] 权限校验

#### 前台功能

- [x] 分类
- [x] 文章
- [x] 评论
