import { ReactChildren } from 'react'
import { KeepAlive } from 'react-activation'

export default function KeepAliveWrap({ children }: { children: ReactChildren }) {
  return <KeepAlive>{children}</KeepAlive>
}
