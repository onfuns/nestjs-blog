import { getLocalUser, logoutUser } from '@/actions/user'
import config from '@/config'
import { message } from 'antd'
import axios, { AxiosRequestConfig } from 'axios'

type IResResult = { success: boolean; message: string; data: any }

const onError = (data: IResResult) => {
  message.error(data.message || '请求出错，请重试')
  return Promise.reject(data)
}

const request = async (
  url: string,
  body: any,
  options: AxiosRequestConfig & { notification?: boolean },
) => {
  const { token = '' } = getLocalUser()
  axios.defaults.baseURL = config.apiBasename
  axios.defaults.headers.common['X-AUTH-ID-TOKEN'] = token
  if (options.method === 'GET') {
    options.params = body
  } else {
    options.data = body
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

const doRequest = (method: AxiosRequestConfig['method']) => {
  return (url: string, body?: any, options: AxiosRequestConfig = {}) =>
    request(url, body, { ...options, method, notification: true })
}

request.get = doRequest('GET')
request.post = doRequest('POST')
request.put = doRequest('PUT')
request.delete = doRequest('DELETE')

export default request
