import request from '@/utils/request'

export const getAuthList = async (params = {}) => {
  return request({
    url: '/auth/list',
    method: 'GET',
    params,
  })
}

export const addAuth = async (params = {}) => {
  return request({
    url: '/auth/add',
    method: 'POST',
    params,
  })
}

export const updateAuth = async (params = {}) => {
  return request({
    url: '/auth/update',
    method: 'POST',
    params,
  })
}

export const deleteAuth = async (params = {}) => {
  return request({
    url: '/auth/delete',
    method: 'POST',
    params,
  })
}
