import { useState } from 'react'
import { Form, Input, Button, Carousel, message } from 'antd'
import styles from './style.module.less'
import { useNavigate } from 'react-router-dom'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { saveLocalUser, loginUser } from '@/actions/user'
import LoginImage from '@/public/images/login-bg.png'
import * as md5 from 'md5'
import { baseRoutes } from '@/routes'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const onSubmit = async () => {
    const values = await form.validateFields()
    setLoading(true)
    const { name, password } = values
    try {
      const { data } = await loginUser({ name, password: md5(password) })
      setLoading(false)
      saveLocalUser(data)
      message.success('登录成功', 1, () => navigate(baseRoutes[0].path))
    } catch (error) {
      setLoading(false)
    }
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
