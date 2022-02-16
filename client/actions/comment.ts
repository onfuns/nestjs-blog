import { request } from '@/utils/request'

export const addComment = async (params = {}) => {
  return request({ url: '/api/comment/add', method: 'POST', params }, 'client_api')
}

export const getCommentList = async (params = {}) => {
  return request({ url: '/api/comment/client/list', params }, 'client_api')
}
