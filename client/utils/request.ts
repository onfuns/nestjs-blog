import axios from 'axios'
import config from '@/config'
import { unset } from 'lodash'

export const request = (options, host = 'api') => {
  const defalutOptions = {
    withCredentials: false,
    timeout: 1000 * 10,
  }
  const { url, method = 'GET', params = {} } = options
  if (method === 'GET') {
    options.params = params
  } else {
    options.data = params
    unset(options, 'params')
  }

  console.log('fetch:', config[host] + url, options.params || options.data)
  return axios(host && config[host] ? config[host] + url : url, {
    ...defalutOptions,
    ...options,
  })
    .then(response => response.data)
    .catch(err => {
      console.log(`request failed:`, err.message)
      return { message: '请求异常，请重试', success: false }
    })
}
