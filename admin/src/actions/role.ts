import api from '@/utils/api'

const url = '/role'
export const getRoleList = async params => api.get(url, params)
export const addRole = async params => api.post(url, params)
export const updateRole = async (id: number, params) => api.get(`${url}/${id}`, params)
export const deleteRole = async (id: number) => api.delete(`${url}/${id}`)
