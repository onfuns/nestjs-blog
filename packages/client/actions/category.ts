import { api } from '@/utils'

export const getCategoryList = async () => api.get('/category/list')
