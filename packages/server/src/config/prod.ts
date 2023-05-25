import { IConfig } from '.'

export const ProdConfig: IConfig = {
  db: {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: (process.env.DB_PORT as any) || 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    entities: ['dist/**/*.entity.js'],
    entityPrefix: 'rs_',
    synchronize: false,
  },
  jwtToken: process.env.JWT_TOKEN,
}
