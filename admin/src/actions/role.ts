import request from '@/utils/request'
const url = '/role'

export const getRoleList = async (params = {}) => {
  return request({
    url,
    method: 'GET',
    params,
  })
}

export const addRole = async (params = {}) => {
  return request({
    url,
    method: 'POST',
    params,
  })
}

export const updateRole = async (id, params = {}) => {
  return request({
    url: `${url}/${id}`,
    method: 'PUT',
    params,
  })
}

export const deleteRole = async id => {
  return request({
    url: `${url}/${id}`,
    method: 'DELETE',
  })
}
