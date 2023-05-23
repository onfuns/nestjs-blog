import config from '@/config'
import { message } from 'antd'
import axios, { AxiosRequestConfig } from 'axios'
import getConfig from 'next/config'
import { isServer } from '.'
const { publicRuntimeConfig = {} } = getConfig()

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
  const { baseUrl } = config
  const { BACKEND_URL } = publicRuntimeConfig
  axios.defaults.baseURL = isServer ? `${BACKEND_URL}${baseUrl}` : baseUrl

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
    return onError(response.data)
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
