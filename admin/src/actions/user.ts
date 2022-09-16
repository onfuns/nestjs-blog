import Cache from '@/utils/cache'
import { LOCAL_USER_KEY } from '@/constants'
import api from '@/utils/api'

const url = '/user'
export const getUserList = async params => api.get(url, params)
export const addUser = async params => api.post(url, params)
export const updateUser = async (id: number, params) => api.get(`${url}/${id}`, params)
export const deleteUser = async (id: number) => api.delete(`${url}/${id}`)
export const loginUser = async params => api.post(`${url}/login`, params)
export const logoutUser = () => {
  removeLocalUser()
  window.location.href = '/admin/login'
}
export const saveLocalUser = data => Cache.set(LOCAL_USER_KEY, data)
export const getLocalUser = (): any => Cache.get(LOCAL_USER_KEY) || {}
export const removeLocalUser = () => Cache.remove(LOCAL_USER_KEY)
