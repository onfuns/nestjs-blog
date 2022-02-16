import { request } from '@/utils/request'

export const getTagList = async (params = {}) => {
  return request({
    url: '/api/tag/list',
    method: 'GET',
    params,
  })
}

export const addTag = async (params = {}) => {
  return request({
    url: '/api/tag/add',
    method: 'POST',
    params,
  })
}

export const updateTag = async (params = {}) => {
  return request({
    url: '/api/tag/update',
    method: 'POST',
    params,
  })
}

export const deleteTag = async (params = {}) => {
  return request({
    url: '/api/tag/delete',
    method: 'POST',
    params,
  })
}
