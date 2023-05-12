import {
  createSearchParams,
  useLocation,
  useNavigate,
  type NavigateOptions,
  type To as NavigateTo,
} from 'react-router-dom'

export const useHistory = () => {
  const location = useLocation()
  const navigate = useNavigate()
  return {
    location,
    push: (to: NavigateTo, options?: NavigateOptions) => navigate(to, options),
    searchToString: (search: string) => createSearchParams(search).toString(),
  }
}
