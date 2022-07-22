import request from '@/utils/request'
import Cache from '@/utils/cache'
import { LOCAL_USER_KEY } from '@/constants'
const url = '/user'

export const getUserList = async (params = {}) => {
  return request({
    url,
    method: 'GET',
    params,
  })
}

export const addUser = async (params = {}) => {
  return request({
    url,
    method: 'POST',
    params,
  })
}

export const updateUser = async (id, params = {}) => {
  return request({
    url: `${url}/${id}`,
    method: 'PUT',
    params,
  })
}

export const deleteUser = async id => {
  return request({
    url: `${url}/${id}`,
    method: 'POST',
  })
}

export const loginUser = async (params = {}) => {
  return request({
    url: `${url}/login`,
    method: 'POST',
    params,
  })
}

export const logoutUser = async () => {
  removeLocalUser()
  window.location.href = '/admin/login'
}

export const saveLocalUser = data => {
  Cache.set(LOCAL_USER_KEY, data)
}

export const getLocalUser = (): any => {
  return Cache.get(LOCAL_USER_KEY) || {}
}

export const removeLocalUser = () => {
  Cache.remove(LOCAL_USER_KEY)
}
