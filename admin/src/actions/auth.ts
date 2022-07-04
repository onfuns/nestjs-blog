import request from '@/utils/request'
const url = '/auth'

export const getAuthList = async (params = {}) => {
  return request({
    url,
    method: 'GET',
    params,
  })
}

export const addAuth = async (params = {}) => {
  return request({
    url,
    method: 'POST',
    params,
  })
}

export const updateAuth = async (id, params = {}) => {
  return request({
    url: `${url}/${id}`,
    method: 'PUT',
    params,
  })
}

export const deleteAuth = async id => {
  return request({
    url: `${url}/${id}`,
    method: 'POST',
  })
}
