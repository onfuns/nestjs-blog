import request from '@/utils/request'
const url = '/article'

export const getArticleList = async (params = {}) => {
  return request({
    url,
    method: 'GET',
    params,
  })
}

export const getArticle = async id => {
  return request({
    url: `${url}/${id}`,
    method: 'GET',
  })
}

export const addArticle = async (params = {}) => {
  return request({
    url,
    method: 'POST',
    params,
  })
}

export const updateArticle = async (id, params = {}) => {
  return request({
    url: `${url}/${id}`,
    method: 'PUT',
    params,
  })
}

export const deleteArticle = async id => {
  return request({
    url: `${url}/${id}`,
    method: 'DELETE',
  })
}
