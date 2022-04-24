import request from '@/utils/request'
import Cache from '@/utils/cache'
import { LOCAL_USER_KEY } from '@/constants'
import { toTree } from '@/utils'

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

export const removeLocalUser = () => {
  Cache.remove(LOCAL_USER_KEY)
}

//获取用户的权限菜单
export const getLocalUserMenu = () => {
  const { resources = [] }: any = getLocalUser()
  //has:1 有权限 type:1 菜单 2: 功能
  //有权限的菜单
  const menus: any[] = resources.filter(t => t.has === 1 && t.type === 1)
  //有权限的功能按钮
  const operation: any[] = resources.filter(t => t.has === 1 && t.type === 2)
  //权限菜单树
  const menusTree = toTree(menus)
  //第一个有权限的菜单
  const fisrt = menusTree?.find(tree => tree?.children?.length > 0) || {}
  return {
    menus,
    operation,
    menusTree,
    fisrtMenu: fisrt?.children?.[0]?.code || '',
  }
}
