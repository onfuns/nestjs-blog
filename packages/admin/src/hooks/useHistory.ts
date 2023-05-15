import {
  createSearchParams,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
  type NavigateOptions,
  type To as NavigateTo,
} from 'react-router-dom'

export const useHistory = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const params = useParams()
  return {
    location,
    push: (to: NavigateTo, options?: NavigateOptions) => navigate(to, options),
    searchToString: (search: string) => createSearchParams(search).toString(),
    searchParams,
    params,
  }
}
