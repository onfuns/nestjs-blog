import { IConfig } from './type'

export default {
  db: {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    entities: ['dist/**/*.entity.js'],
    entityPrefix: 'rs_',
  },
  jwtToken: process.env.JWT_TOKEN,
} as IConfig
