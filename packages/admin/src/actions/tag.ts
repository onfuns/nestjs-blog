import { api } from '@/utils'

const url = '/tag'
export const getTagList = async (params = {}) => api.get(url, params)
export const addTag = async (params) => api.post(url, params)
export const updateTag = async (id: number, params) => api.get(`${url}/${id}`, params)
export const deleteTag = async (id: number) => api.delete(`${url}/${id}`)
