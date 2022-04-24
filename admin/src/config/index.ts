import BaseConfig from './base'
import DevConfig from './dev'
import ProdConfig from './prod'

interface IConfig {
  base?: string
}

const Config = process.env.NODE_ENV === 'production' ? ProdConfig : DevConfig
export default { ...BaseConfig, ...Config } as IConfig
