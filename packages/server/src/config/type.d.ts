import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export interface IConfig {
  base?: string
  db?: TypeOrmModuleOptions
  jwtToken?: string
}
