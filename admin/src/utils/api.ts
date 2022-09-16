import axios, { AxiosRequestConfig } from 'axios'
import config from '@/config'
import { unset } from 'lodash'
import { getLocalUser, logoutUser } from '@/actions/user'
import { message } from 'antd'

const onError = (data: { success: boolean; message: string; data: any }) => {
  message.error(data.message || '请求出错，请重试')
  return Promise.reject(data)
}

const request = async (
  url: string,
  data,
  options: AxiosRequestConfig & { notification?: boolean } = { notification: true },
) => {
  const { token = '' } = getLocalUser()
  axios.defaults.baseURL = config.base
  axios.defaults.headers.common['X-AUTH-ID-TOKEN'] = token
  if (options.method === 'GET') {
    options.params = data
  } else {
    options.data = data
  }

  try {
    const { data } = await axios({
      url,
      timeout: 1000 * 5,
      ...options,
    })
    if (options.notification && data?.success === false && data?.message) {
      return onError(data)
    }
    return data
  } catch ({ response }) {
    const { status, data } = response
    if (status === 403) {
      if (data?.message === 'INVALID_TOKEN') {
        message.error('登录过期，请重新登录', 2).then(logoutUser)
        return false
      }

      if (data?.message === 'INVALID_AUTH') {
        return onError({ ...data, message: '抱歉，无权限操作' })
      }
    }
    return onError(data)
  }
}

request.get = async (url: string, data?: any, options: AxiosRequestConfig = {}) =>
  request(url, data, { ...options, method: 'GET' })
request.post = async (url: string, data?: any, options: AxiosRequestConfig = {}) =>
  request(url, data, { ...options, method: 'POST' })
request.put = (url: string, data?: any, options: AxiosRequestConfig = {}) =>
  request(url, data, { ...options, method: 'PUT' })
request.delete = (url: string, data?: any, options: AxiosRequestConfig = {}) =>
  request(url, data, { ...options, method: 'DELETE' })

export default request
