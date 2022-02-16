import { request } from '@/utils/request'

export const getArticleList = async (params = {}) => {
  return request({ url: '/api/article/client/list', params })
}

export const getArticleDetailById = async (params = {}) => {
  return request({ url: '/api/article/info', params })
}
