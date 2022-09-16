import request from '@/utils/request'
const url = '/website'

export const getWebsiteConfig = async (params = {}) => {
  return request({
    url,
    method: 'GET',
    params,
  })
}

export const updateWebsiteConfig = async (params = {}) => {
  return request({
    url,
    method: 'POST',
    params,
  })
}
