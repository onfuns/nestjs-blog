import { useEffect, useState } from 'react'
import { getLocalUser, logoutUser } from '@/actions/user'

export default props => {
  const [login, setLogin] = useState(false)

  useEffect(() => {
    ;(async () => {
      const { token } = await getLocalUser()
      if (!token) {
        logoutUser()
      } else {
        setLogin(true)
      }
    })()
  }, [])

  return login ? props.children : null
}
