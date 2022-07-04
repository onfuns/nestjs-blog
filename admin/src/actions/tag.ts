import request from '@/utils/request'
const url = '/tag'

export const getTagList = async (params = {}) => {
  return request({
    url,
    method: 'GET',
    params,
  })
}

export const addTag = async (params = {}) => {
  return request({
    url,
    method: 'POST',
    params,
  })
}

export const updateTag = async (id, params = {}) => {
  return request({
    url: `${url}/${id}`,
    method: 'PUT',
    params,
  })
}

export const deleteTag = async id => {
  return request({
    url: `${url}/${id}`,
    method: 'DELETE',
  })
}
