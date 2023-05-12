import DevConfig from './dev'
import ProdConfig from './prod'

export interface IConfig {
  apiBasename?: string
  routeBasename?: string
}

const BaseConfig: IConfig = {
  apiBasename: '/api',
  routeBasename: '/admin',
}

const Config: IConfig = process.env.NODE_ENV === 'production' ? ProdConfig : DevConfig
export default { ...BaseConfig, ...Config }
