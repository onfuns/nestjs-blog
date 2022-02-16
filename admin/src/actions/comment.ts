import { request } from '@/utils/request'

export const getCommentList = async (params = {}) => {
  return request({
    url: '/api/comment/list',
    method: 'GET',
    params,
  })
}

export const addComment = async (params = {}) => {
  return request({
    url: '/api/comment/add',
    method: 'POST',
    params,
  })
}

export const updateComment = async (params = {}) => {
  return request({
    url: '/api/comment/update',
    method: 'POST',
    params,
  })
}

export const deleteComment = async (params = {}) => {
  return request({
    url: '/api/comment/delete',
    method: 'POST',
    params,
  })
}
