import request from '@/utils/request'

export const getDashboardInfo = (params = {}) => {
  return request({
    url: '/dashboard/info',
    method: 'GET',
    params,
  })
}
