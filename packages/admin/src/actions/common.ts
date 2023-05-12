import { api } from '@/utils'

export const getDashboardData = () => api.get('/common/dashboard')
