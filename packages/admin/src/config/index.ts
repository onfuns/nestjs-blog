import BaseConfig from './base'
import DevConfig from './dev'
import ProdConfig from './prod'

const Config = process.env.NODE_ENV === 'production' ? ProdConfig : DevConfig
export default { ...BaseConfig, ...Config }
