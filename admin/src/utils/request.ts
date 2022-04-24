import axios from 'axios'
import config from '@/config'
import { unset } from 'lodash'
import { getLocalUser } from '@/actions/user'
import { message } from 'antd'

const request = (options, showMsg = true) => {
  const { base } = config
  const { token = '' } = getLocalUser()
  axios.defaults.baseURL = base
  axios.defaults.headers.common['x-auth-id-token'] = token
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
            window.location.href = '/admin/login'
          })
          return false
        }

        if (data?.msg === 'AUTH_INVALID') {
          return message.error('抱歉，无权限操作')
        }
      }
      const errmsg = data?.msg || '请求出错，请重试'
      if (showMsg) message.error(errmsg)
      return { msg: errmsg, success: false }
    })
}

export default request
