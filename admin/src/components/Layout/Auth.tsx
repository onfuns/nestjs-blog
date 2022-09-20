import { useEffect, useState } from 'react'
import { getLocalUser, logoutUser } from '@/actions/user'

export default function Auth(props) {
  const [login, setLogin] = useState(false)
  const { token } = getLocalUser()

  useEffect(() => {
    if (token) {
      setLogin(true)
    } else {
      logoutUser()
    }
  }, [])
  return login && props.children
}
