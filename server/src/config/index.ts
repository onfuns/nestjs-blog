import ConfigDev from './dev'
import ConfigProd from './prod'

export default process.env.NODE_ENV === 'production' ? ConfigProd : ConfigDev
