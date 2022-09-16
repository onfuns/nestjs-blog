import api from '@/utils/api'

const url = '/file'
export const getFileList = async params => api.get(url, params)
export const addFile = async params =>
  api.post(`${url}/upload`, params, { headers: { 'Content-Type': 'multipart/form-data' } })
export const updateFile = async (id: number, params) => api.get(`${url}/${id}`, params)
export const deleteFile = async (id: number) => api.delete(`${url}/${id}`)
export const getFileTypeList = async () => api.get(`${url}/type`)
export const addFileType = async params => api.post(`${url}/type`, params)
