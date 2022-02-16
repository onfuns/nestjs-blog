import { request } from '@/utils/request'

export const getAuthList = async (params = {}) => {
  return request({
    url: '/api/auth/list',
    method: 'GET',
    params,
  })
}

export const addAuth = async (params = {}) => {
  return request({
    url: '/api/auth/add',
    method: 'POST',
    params,
  })
}

export const updateAuth = async (params = {}) => {
  return request({
    url: '/api/auth/update',
    method: 'POST',
    params,
  })
}

export const deleteAuth = async (params = {}) => {
  return request({
    url: '/api/auth/delete',
    method: 'POST',
    params,
  })
}
