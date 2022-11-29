import { useEffect, useState } from 'react'
import { getLocalUser, logoutUser } from '@/actions/user'

export default function Auth(props) {
  const [isLogin, setIsLogin] = useState(false)
  const { token = 'admin' } = getLocalUser()

  useEffect(() => {
    if (token) {
      setIsLogin(true)
    } else {
      logoutUser()
    }
  }, [])
  return isLogin && props.children
}
