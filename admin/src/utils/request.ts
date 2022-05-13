import axios from 'axios'
import config from '@/config'
import { unset } from 'lodash'
import { getLocalUser } from '@/actions/user'
import { message } from 'antd'

const onError = (msg = '请求出错，请重试') => {
  message.error(msg)
  Promise.reject(msg)
}

const request = (
  options: {
    url: string
    method?: string
    params?: Record<string, any>
    data?: Record<string, any>
    [key: string]: any
  },
  extraConfig = {
    msg: true,
  },
) => {
  const { base } = config
  const { token = '' } = getLocalUser()
  axios.defaults.baseURL = base
  axios.defaults.headers.common['x-auth-id-token'] = token
  const { url, method = 'GET', params, ...otherOptions } = options
  let axiosOptions: any = {}
  if (method === 'GET') {
    axiosOptions.params = params
  } else {
    axiosOptions.data = params
    unset(options, 'params')
  }

  return axios({
    url,
    withCredentials: false,
    timeout: 1000 * 10,
    ...axiosOptions,
    ...otherOptions,
  })
    .then(({ data }) => {
      if (extraConfig.msg && data?.success === false && data?.message) {
        onError(data?.message)
      }
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
          return onError('抱歉，无权限操作')
        }
      }
      onError(msg)
    })
}

export default request
