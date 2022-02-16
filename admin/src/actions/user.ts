import { request } from '@/utils/request'

export const getUserList = async (params = {}) => {
  return request({
    url: '/api/user/list',
    method: 'GET',
    params,
  })
}

export const addUser = async (params = {}) => {
  return request({
    url: '/api/user/add',
    method: 'POST',
    params,
  })
}

export const updateUser = async (params = {}) => {
  return request({
    url: '/api/user/update',
    method: 'POST',
    params,
  })
}

export const deleteUser = async (params = {}) => {
  return request({
    url: '/api/user/delete',
    method: 'POST',
    params,
  })
}

export const loginUser = async (params = {}) => {
  return request({
    url: '/api/user/login',
    method: 'POST',
    params,
  })
}
