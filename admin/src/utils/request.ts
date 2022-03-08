import axios from 'axios'
import config from '@/config'
import { unset } from 'lodash'
import Cache from '@/utils/cache'
import { LOCAL_USER_TOKEN_KEY } from '@/constants'
import { message } from 'antd'

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
    .catch(({ response }) => {
      const { status, data } = response
      if (status === 403) {
        if (data?.msg === 'TOKEN_INVALID') {
          message.error('登录过期，请重新登录', 2).then(() => {
            window.location.href = '/admin-website/login'
          })
          return false
        }

        if (data?.msg === 'AUTH_INVALID') {
          return message.error('抱歉，无权限操作')
        }
      }
      return { msg: data?.msg || '请求出错，请重试', success: false }
    })
}

export default request
