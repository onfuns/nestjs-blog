import config from '@/config'
import { LOCAL_USER_KEY } from '@/constants'
import { api, cache } from '@/utils'

const url = '/user'
export const getUserList = async (params) => api.get(url, params)
export const addUser = async (params) => api.post(url, params)
export const updateUser = async (id: number, params) => api.get(`${url}/${id}`, params)
export const deleteUser = async (id: number) => api.delete(`${url}/${id}`)
export const loginUser = async (params) => api.post(`${url}/login`, params)
export const logoutUser = () => {
  removeLocalUser()
  window.location.href = `${config.routeBasename}/login`
}
export const saveLocalUser = (data) => cache.set(LOCAL_USER_KEY, data)
export const getLocalUser = (): any => cache.get(LOCAL_USER_KEY) || {}
export const removeLocalUser = () => cache.remove(LOCAL_USER_KEY)
