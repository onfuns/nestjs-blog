import api from '@/utils/api'

export const getDashboardData = () => api.get('/common/dashboard')
