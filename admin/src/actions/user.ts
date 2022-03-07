import request from '@/utils/request'

export const getUserList = async (params = {}) => {
  return request({
    url: '/user/list',
    method: 'GET',
    params,
  })
}

export const addUser = async (params = {}) => {
  return request({
    url: '/user/add',
    method: 'POST',
    params,
  })
}

export const updateUser = async (params = {}) => {
  return request({
    url: '/user/update',
    method: 'POST',
    params,
  })
}

export const deleteUser = async (params = {}) => {
  return request({
    url: '/user/delete',
    method: 'POST',
    params,
  })
}

export const loginUser = async (params = {}) => {
  return request({
    url: '/user/login',
    method: 'POST',
    params,
  })
}
