import ProdConfig from './prod'
import DevConfig from './dev'
import getConfig from 'next/config'
const { publicRuntimeConfig = {} } = getConfig()

let config = {}
switch (publicRuntimeConfig.NODE_ENV) {
  case 'development':
    config = DevConfig
    break
  case 'production':
    config = ProdConfig
    break
  default:
    config = DevConfig
    break
}
export default config
