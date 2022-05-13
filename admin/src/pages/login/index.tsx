import { useState } from 'react'
import { Form, Input, Button, Carousel } from 'antd'
import styles from './style.less'
import { history } from 'umi'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { saveLocalUser, loginUser } from '@/actions/user'
import LoginImage from '@/assets/images/login-bg.png'

export default () => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const onSubmit = async () => {
    form.validateFields().then(async values => {
      setLoading(true)
      const { name, password } = values
      const { data } = await loginUser({ name, password })
      setLoading(false)
      saveLocalUser(data)
      history.push('/dashboard')
    })
  }
  return (
    <div className={styles.loginPage}>
      <div className={styles.content}>
        <div className={styles.carousel}>
          <Carousel>
            <img src={LoginImage} />
          </Carousel>
        </div>
        <Form form={form} className={styles.form}>
          <h1 className={styles.title}>Nest-Blog</h1>
          <Form.Item name="name" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input size="large" prefix={<UserOutlined />} placeholder="用户名" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input
              size="large"
              prefix={<LockOutlined />}
              type="password"
              placeholder="密码"
              onPressEnter={onSubmit}
            />
          </Form.Item>

          <Form.Item noStyle>
            <Button
              type="primary"
              size="large"
              onClick={onSubmit}
              className={styles.button}
              loading={loading}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
