import request from '@/utils/request'

export const getDashboardData = (params = {}) => {
  return request({
    url: '/common/dashboard',
    method: 'GET',
    params,
  })
}
