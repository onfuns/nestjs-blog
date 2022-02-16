import { request } from '@/utils/request'

export const getArticleList = async (params = {}) => {
  return request({
    url: '/api/article/list',
    method: 'GET',
    params,
  })
}

export const addArticle = async (params = {}) => {
  return request({
    url: '/api/article/create',
    method: 'POST',
    params,
  })
}

export const updateArticle = async (params = {}) => {
  return request({
    url: '/api/article/update',
    method: 'POST',
    params,
  })
}

export const deleteArticle = async (params = {}) => {
  return request({
    url: '/api/article/delete',
    method: 'POST',
    params,
  })
}

export const getArticleInfoById = async (params = {}) => {
  return request({
    url: '/api/article/info',
    method: 'GET',
    params,
  })
}
