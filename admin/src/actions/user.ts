import request from '@/utils/request'
import Cache from '@/utils/cache'
import { LOCAL_USER_KEY } from '@/constants'

export const getUserList = async (params = {}) => {
  return request({
    url: '/user/list',
    method: 'GET',
    params,
  })
}

export const addUser = async (params = {}) => {
  return request({
    url: '/user/add',
    method: 'POST',
    params,
  })
}

export const updateUser = async (params = {}) => {
  return request({
    url: '/user/update',
    method: 'POST',
    params,
  })
}

export const deleteUser = async (params = {}) => {
  return request({
    url: '/user/delete',
    method: 'POST',
    params,
  })
}

export const loginUser = async (params = {}) => {
  return request({
    url: '/user/login',
    method: 'POST',
    params,
  })
}

export const saveLocalUser = data => {
  Cache.set(LOCAL_USER_KEY, data)
}

export const getLocalUser = (): any => {
  return Cache.get(LOCAL_USER_KEY) || {}
}

export const logoutUser = () => {
  Cache.remove(LOCAL_USER_KEY)
}
