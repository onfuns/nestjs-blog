import { request } from '@/utils/request'

export const getRoleList = async (params = {}) => {
  return request({
    url: '/api/role/list',
    method: 'GET',
    params,
  })
}

export const getRoleInfoById = async (params = {}) => {
  return request({
    url: '/api/role/info',
    method: 'GET',
    params,
  })
}

export const addRole = async (params = {}) => {
  return request({
    url: '/api/role/add',
    method: 'POST',
    params,
  })
}

export const updateRole = async (params = {}) => {
  return request({
    url: '/api/role/update',
    method: 'POST',
    params,
  })
}

export const deleteRole = async (params = {}) => {
  return request({
    url: '/api/role/delete',
    method: 'POST',
    params,
  })
}
