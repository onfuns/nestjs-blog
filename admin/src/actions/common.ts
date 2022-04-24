import request from '@/utils/request'

export const getDashboardInfo = (params = {}) => {
  return request({
    url: '/common/dashboard',
    method: 'GET',
    params,
  })
}
