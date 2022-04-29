import axios from 'axios'
import config from '@/config'
import { unset } from 'lodash'
import { getLocalUser } from '@/actions/user'
import { message } from 'antd'

const onMessage = (msg = '请求出错，请重试') => {
  message.error(msg)
}

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
    .then(({ data }) => {
      if (showMsg && data.success === false) onMessage(data?.message)
      return data
    })
    .catch(({ response }) => {
      const { status, data } = response
      const msg = data?.message
      if (status === 403) {
        if (msg === 'INVALID_TOKEN') {
          message.error('登录过期，请重新登录', 2).then(() => {
            window.location.href = '/admin/login'
          })
          return false
        }

        if (msg === 'INVALID_AUTH') {
          return message.error('抱歉，无权限操作')
        }
      }
      if (showMsg && data.success === false) onMessage(msg)
      return { message: msg, success: false }
    })
}

export default request
