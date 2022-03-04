import request from '@/utils/request'

export const getArticleList = async (params = {}) => {
  return request({ url: '/article/client/list', params })
}

export const getArticleDetailById = async (params = {}) => {
  return request({ url: '/article/info', params })
}
