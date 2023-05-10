import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'

export default function NotFountPage() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="页面不见啦，请返回主页~"
      extra={
        <Link to="/">
          <Button type="primary">返回主页</Button>
        </Link>
      }
    />
  )
}
