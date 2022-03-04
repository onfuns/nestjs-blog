import BaseConfig from './base'
import ProdConfig from './prod'
import DevConfig from './dev'
import getConfig from 'next/config'
const { publicRuntimeConfig = {} } = getConfig()

interface IConfig {
  base?: string
  server_api?: string
}

let Config: IConfig = {}
switch (publicRuntimeConfig.NODE_ENV) {
  case 'development':
    Config = DevConfig
    break
  case 'production':
    Config = ProdConfig
    break
  default:
    Config = DevConfig
    break
}
export default { ...BaseConfig, ...Config } as IConfig
