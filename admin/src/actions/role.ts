import request from '@/utils/request'

export const getRoleList = async (params = {}) => {
  return request({
    url: '/role/list',
    method: 'GET',
    params,
  })
}

export const getRoleInfoById = async (params = {}) => {
  return request({
    url: '/role/info',
    method: 'GET',
    params,
  })
}

export const addRole = async (params = {}) => {
  return request({
    url: '/role/add',
    method: 'POST',
    params,
  })
}

export const updateRole = async (params = {}) => {
  return request({
    url: '/role/update',
    method: 'POST',
    params,
  })
}

export const deleteRole = async (params = {}) => {
  return request({
    url: '/role/delete',
    method: 'POST',
    params,
  })
}
