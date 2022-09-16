import api from '@/utils/api'

const url = '/category'
export const getCategoryList = async params => api.get(url, params)
export const addCategory = async params => api.post(url, params)
export const updateCategory = async (id: number, params) => api.get(`${url}/${id}`, params)
export const deleteCategory = async (id: number) => api.delete(`${url}/${id}`)
