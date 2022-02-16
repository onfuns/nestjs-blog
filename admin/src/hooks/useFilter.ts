import { useLocation } from 'umi'
import qs from 'qs'

export const useFilter = (defaultFilter = {}) => {
  const location = useLocation()
  const filter = location.search ? qs.parse(location.search.slice(1)) : {}
  return { ...defaultFilter, ...filter }
}
