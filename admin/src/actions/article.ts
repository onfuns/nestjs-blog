import api from '@/utils/api'

const url = '/article'
export const getArticleList = async params => api.get(url, params)
export const getArticle = async (id: string) => api.get(`${url}/${id}`)
export const addArticle = async params => api.post(url, params)
export const updateArticle = async (id: string, params) => api.put(`${url}/${id}`, params)
export const deleteArticle = async (id: string) => api.delete(`${url}/${id}`)
