import request from '@/utils/request'

export const getCommentList = async (params = {}) => {
  return request({
    url: '/comment/list',
    method: 'GET',
    params,
  })
}

export const addComment = async (params = {}) => {
  return request({
    url: '/comment/add',
    method: 'POST',
    params,
  })
}

export const updateComment = async (params = {}) => {
  return request({
    url: '/comment/update',
    method: 'POST',
    params,
  })
}

export const deleteComment = async (params = {}) => {
  return request({
    url: '/comment/delete',
    method: 'POST',
    params,
  })
}
