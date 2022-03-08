import { IConfig } from './type'
export default {
  db: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'a123456',
    database: 'nest_blog',
    entities: ['dist/**/*.entity.js'],
    entityPrefix: 'rs_',
    synchronize: true, //自动创建数据库结构，生产环境禁用
    logging: ['query', 'error'],
  },
  jwtToken: 'CODERFUNS.COM BY ONFUNS',
} as IConfig
