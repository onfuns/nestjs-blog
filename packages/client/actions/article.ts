import { api } from '@/utils'

export const getArticleList = async (params) => api.get('/article/list', params)
export const getArticle = async ({ id }) => api.get(`/article/${id}`)
