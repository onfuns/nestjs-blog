import request from '@/utils/request'

export const getArticleList = async (params = {}) => {
  return request({
    url: '/article/list',
    method: 'GET',
    params,
  })
}

export const addArticle = async (params = {}) => {
  return request({
    url: '/article/create',
    method: 'POST',
    params,
  })
}

export const updateArticle = async (params = {}) => {
  return request({
    url: '/article/update',
    method: 'POST',
    params,
  })
}

export const deleteArticle = async (params = {}) => {
  return request({
    url: '/article/delete',
    method: 'POST',
    params,
  })
}

export const getArticleInfoById = async (params = {}) => {
  return request({
    url: '/article/info',
    method: 'GET',
    params,
  })
}
