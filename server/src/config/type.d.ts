import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export interface IConfig {
  db: TypeOrmModuleOptions
  jwtToken: string
}
