import { IS_DEV } from '@/util'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { DevConfig } from './dev'
import { ProdConfig } from './prod'

export type IConfig = {
  base?: string
  db?: TypeOrmModuleOptions
  jwtToken?: string
}

const BaseConfig: IConfig = {
  base: '/api',
}

export default {
  ...BaseConfig,
  ...(IS_DEV ? DevConfig : ProdConfig),
}
