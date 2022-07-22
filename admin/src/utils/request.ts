import axios from 'axios'
import config from '@/config'
import { unset } from 'lodash'
import { getLocalUser, logoutUser } from '@/actions/user'
import { message } from 'antd'

const onError = (data: { success: boolean; message: string; data: any }) => {
  message.error(data.message || '请求出错，请重试')
  return Promise.reject(data)
}

const request = async (
  options: {
    url: string
    method?: string
    params?: Record<string, any>
    data?: Record<string, any>
    [key: string]: any
  },
  extraConfig = { msg: true },
) => {
  const { base } = config
  const { token = '' } = getLocalUser()
  axios.defaults.baseURL = base
  axios.defaults.headers.common['X-AUTH-ID-TOKEN'] = token
  const { url, method = 'GET', params, ...otherOptions } = options
  const axiosOptions: any = {}
  if (method === 'GET') {
    axiosOptions.params = params
  } else {
    axiosOptions.data = params
    unset(options, 'params')
  }

  try {
    const { data } = await axios({
      url,
      method,
      withCredentials: false,
      timeout: 1000 * 10,
      ...axiosOptions,
      ...otherOptions,
    })
    if (extraConfig.msg && data?.success === false && data?.message) {
      return onError(data)
    }
    return data
  } catch ({ response }) {
    const { status, data } = response
    if (status === 403) {
      if (data?.message === 'INVALID_TOKEN') {
        message.error('登录过期，请重新登录', 2).then(() => {
          logoutUser()
        })
        return false
      }

      if (data?.message === 'INVALID_AUTH') {
        return onError({ ...data, message: '抱歉，无权限操作' })
      }
    }
    return onError(data)
  }
}

export default request
