import axios from 'axios'
import config from '@/config'
import { unset } from 'lodash'
import Cache from '@/utils/cache'
import { LOCAL_USER_TOKEN_KEY } from '@/constants'

const request = options => {
  const { base } = config
  axios.defaults.baseURL = base
  axios.defaults.headers.common['x-auth-id-token'] = Cache.get(LOCAL_USER_TOKEN_KEY)
  const { url, method = 'GET', params } = options
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
      const { status, data } = err.response
      if (status === 403 && data?.msg === 'TOKEN_INVALID') {
        window.location.href = '/admin-website/login'
        return false
      }
      return { msg: data?.msg || '请求异常，请重试', success: false }
    })
}

export default request
