import { Result, Button } from 'antd'
import { Link } from 'umi'

export default () => (
  <Result
    status="404"
    title="404"
    subTitle="页面不见啦，请返回主页~"
    extra={
      <Link to="/">
        <Button type="primary">回到首页</Button>
      </Link>
    }
  />
)
