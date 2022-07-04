import request from '@/utils/request'
const url = '/category'

export const getCategoryList = async (params = {}) => {
  return request({
    url,
    method: 'GET',
    params,
  })
}

export const addCategory = async (params = {}) => {
  return request({
    url,
    method: 'POST',
    params,
  })
}

export const updateCategory = async (id, params = {}) => {
  return request({
    url: `${url}/${id}`,
    method: 'PUT',
    params,
  })
}

export const deleteCategory = async id => {
  return request({
    url: `${url}/${id}`,
    method: 'DELETE',
  })
}
