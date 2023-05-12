import { loginUser, saveLocalUser } from '@/actions/user'
import { useHistory } from '@/hooks'
import LoginImage from '@/public/images/login-bg.png'
import { baseRoutes } from '@/routes'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { ProForm, ProFormText } from '@ant-design/pro-components'
import { Button, message } from 'antd'
import * as md5 from 'md5'
import { useState } from 'react'
import './style.less'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [form] = ProForm.useForm()
  const history = useHistory()

  const onSubmit = async () => {
    const values = await form.validateFields()
    try {
      setLoading(true)
      const { name, password } = values
      const { data } = await loginUser({ name, password: md5(password) })
      setLoading(false)
      saveLocalUser(data)
      message.success('登录成功', 1, () => history.push(baseRoutes[0].path))
    } catch (error) {
      setLoading(false)
    }
  }
  return (
    <div className="login-page absolute top-0 right-0 bottom-0 left-0 flex-center flex-col">
      <div className="flex items-center overflow-hidden w-1080 h-600 flex-shrink-0 bg-white border-rd-10">
        <div className="flex items-center w-500 h-100%">
          <img src={LoginImage} />
        </div>
        <ProForm form={form} className="w-350 ml-100">
          <h1 className="mb-40 text-size-30">Nest-Blog</h1>
          <ProFormText
            name="name"
            rules={[{ required: true, message: '请输入用户名' }]}
            fieldProps={{ prefix: <UserOutlined /> }}
            placeholder="用户名"
          />
          <ProFormText.Password
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
            fieldProps={{ prefix: <LockOutlined />, onPressEnter: onSubmit }}
            placeholder="密码"
          />
          <ProForm.Item noStyle>
            <Button
              type="primary"
              size="large"
              onClick={onSubmit}
              className="w-100% h-50 border-rd-6"
              loading={loading}
            >
              登录
            </Button>
          </ProForm.Item>
        </ProForm>
      </div>
    </div>
  )
}
