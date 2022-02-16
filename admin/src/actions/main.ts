import { request } from '@/utils/request'

export const getDashboardInfo = (params = {}) => {
  return request({
    url: '/api/dashboard/info',
    method: 'GET',
    params,
  })
}
