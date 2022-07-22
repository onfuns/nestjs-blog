import request from '@/utils/request'
const url = '/comment'

export const getCommentList = async (params = {}) => {
  return request({
    url,
    method: 'GET',
    params,
  })
}

export const addComment = async (params = {}) => {
  return request({
    url,
    method: 'POST',
    params,
  })
}

export const updateComment = async (id, params = {}) => {
  return request({
    url: `${url}/${id}`,
    method: 'PUT',
    params,
  })
}

export const deleteComment = async id => {
  return request({
    url: `${url}/${id}`,
    method: 'DELETE',
  })
}
