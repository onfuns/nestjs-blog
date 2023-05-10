import { getLocalUser, logoutUser } from '@/actions/user'
import { useEffect, useState } from 'react'

export default function Auth(props) {
  const [isLogin, setIsLogin] = useState(false)
  const { token } = getLocalUser()

  useEffect(() => {
    if (token) {
      setIsLogin(true)
    } else {
      logoutUser()
    }
  }, [])
  return isLogin && props.children
}
