import { request } from '@/utils/request'

export const getCategoryList = async () => {
  return request({ url: '/api/category/list' })
}
