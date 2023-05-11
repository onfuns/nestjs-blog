import { loginUser, saveLocalUser } from '@/actions/user'
import LoginImage from '@/public/images/login-bg.png'
import { baseRoutes } from '@/routes'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Carousel, Form, Input, message } from 'antd'
import * as md5 from 'md5'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.less'

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
    <div className="absolute top-0 right-0 bottom-0 left-0 flex-center flex-col login-page">
      <div className="flex items-center overflow-hidden w-1080 h-600 flex-shrink-0 bg-white border-rd-10">
        <div className="flex items-center w-500 h-100% bg-#fafbfc login-carousel">
          <Carousel>
            <img src={LoginImage} />
          </Carousel>
        </div>
        <Form form={form} className="w-350 ml-100">
          <h1 className="mb-40 text-size-30">Nest-Blog</h1>
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
              className="w-100% h-50 border-rd-6"
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
