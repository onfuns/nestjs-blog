import DevConfig from './dev'
import ProdConfig from './prod'

export default process.env.NODE_ENV === 'production' ? ProdConfig : DevConfig
