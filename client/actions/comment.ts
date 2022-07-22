import request from '@/utils/request'

export const addComment = async (params = {}) => {
  return request({ url: '/comment/add', method: 'POST', params })
}

export const getCommentList = async (params = {}) => {
  return request({ url: '/comment/list', params })
}
