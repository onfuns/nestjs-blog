import axios from 'axios'
import config from '@/config'
import { unset } from 'lodash'
import { isServer } from './util'
import getConfig from 'next/config'
const { publicRuntimeConfig = {} } = getConfig()

const request = options => {
  const { baseUrl } = config
  const { BACKEND_URL } = publicRuntimeConfig
  axios.defaults.baseURL = isServer ? `${BACKEND_URL}${baseUrl}` : baseUrl

  const { url, method = 'GET', params = {} } = options
  if (method === 'GET') {
    options.params = params
  } else {
    options.data = params
    unset(options, 'params')
  }
  return axios({
    url,
    withCredentials: false,
    timeout: 1000 * 10,
    ...options,
  })
    .then(response => response.data)
    .catch(err => {
      console.log(`请求失败:`, url, options, err.message)
      return { message: '请求异常，请重试', success: false }
    })
}

export default request
