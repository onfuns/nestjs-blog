import request from '@/utils/request'
const url = '/file'

export const getFileList = async (params = {}) => {
  return request({
    url,
    method: 'GET',
    params,
  })
}

export const addFile = async (params = {}) => {
  return request({
    url: `${url}/upload`,
    method: 'POST',
    params,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const updateFile = async (id, params = {}) => {
  return request({
    url: `${url}/${id}`,
    method: 'PUT',
    params,
  })
}

export const deleteFile = async id => {
  return request({
    url: `${url}/${id}`,
    method: 'DELETE',
  })
}

export const getFileTypeList = async (params = {}) => {
  return request({
    url: `${url}/type`,
    method: 'GET',
    params,
  })
}

export const addFileType = async (params = {}) => {
  return request({
    url: `${url}/type`,
    method: 'POST',
    params,
  })
}
