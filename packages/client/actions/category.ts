import request from '@/utils/request'

export const getCategoryList = async () => {
  return request({ url: '/category/list' })
}
