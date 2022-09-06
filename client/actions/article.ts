import request from '@/utils/request'

export const getArticleList = async (params = {}) => {
  return request({ url: '/article/list', params })
}

export const getArticle = async ({ id }) => {
  return request({ url: `/article/${id}` })
}
