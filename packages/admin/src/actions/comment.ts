import { api } from '@/utils'

const url = '/comment'
export const getCommentList = async (params) => api.get(url, params)
export const addComment = async (params) => api.post(url, params)
export const updateComment = async (id: number, params) => api.get(`${url}/${id}`, params)
export const deleteComment = async (id: number) => api.delete(`${url}/${id}`)
