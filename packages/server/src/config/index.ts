import BaseConfig from './base'
import DevConfig from './dev'
import ProdConfig from './prod'
const _DEV_ = process.env.NODE_ENV !== 'production'

export default {
  ...BaseConfig,
  ...(_DEV_ ? DevConfig : ProdConfig),
}
