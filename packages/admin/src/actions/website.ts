import api from '@/utils/api'

const url = '/website'
export const getWebsiteConfig = async (params) => api.get(url, params)
export const updateWebsiteConfig = async (params) => api.post(url, params)
