import { api } from '@/utils'

export const getCommentList = async (params) => api.get('/comment/list', params)
export const addComment = async (params) => api.post('/comment/add', params)
