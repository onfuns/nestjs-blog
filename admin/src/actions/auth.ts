import api from '@/utils/api'

const url = '/auth'
export const getAuthList = async (params = {}) => api.get(url, params)
export const addAuth = async params => api.post(url, params)
export const updateAuth = async (id: number, params) => api.get(`${url}/${id}`, params)
export const deleteAuth = async (id: number) => api.delete(`${url}/${id}`)
