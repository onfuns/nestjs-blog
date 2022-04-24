import request from '@/utils/request'

export const getCategoryList = async (params = {}) => {
  return request({
    url: '/category/list',
    method: 'GET',
    params,
  })
}

export const addCategory = async (params = {}) => {
  return request({
    url: '/category/add',
    method: 'POST',
    params,
  })
}

export const updateCategory = async (params = {}) => {
  return request({
    url: '/category/update',
    method: 'POST',
    params,
  })
}

export const deleteCategory = async (params = {}) => {
  return request({
    url: '/category/delete',
    method: 'POST',
    params,
  })
}
