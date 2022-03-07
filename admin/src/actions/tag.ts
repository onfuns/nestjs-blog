import request from '@/utils/request'

export const getTagList = async (params = {}) => {
  return request({
    url: '/tag/list',
    method: 'GET',
    params,
  })
}

export const addTag = async (params = {}) => {
  return request({
    url: '/tag/add',
    method: 'POST',
    params,
  })
}

export const updateTag = async (params = {}) => {
  return request({
    url: '/tag/update',
    method: 'POST',
    params,
  })
}

export const deleteTag = async (params = {}) => {
  return request({
    url: '/tag/delete',
    method: 'POST',
    params,
  })
}
