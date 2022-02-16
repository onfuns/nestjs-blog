import { useState } from 'react'
import { Form, Input, Button, message } from 'antd'
import { LOCAL_USER_TOKEN_KEY, LOCAL_USER_NAME_KEY } from '@/constants'
import styles from './style.module.less'
import { useHistory } from 'umi'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { inject } from 'mobx-react'
import { UserStore } from '@/store'
import Cache from '@/utils/cache'
interface IPros {
  userStore: UserStore
}

const LoginPage = ({ userStore }: IPros) => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const history = useHistory()

  const onSubmit = async () => {
    form.validateFields().then(async values => {
      setLoading(true)
      const { name, password } = values
      const {
        success,
        data,
        msg = '登录失败',
      } = await userStore.login({
        name,
        password,
      })
      setLoading(false)
      if (!success) {
        return message.error(msg)
      }
      Cache.set(LOCAL_USER_TOKEN_KEY, data.token)
      Cache.set(LOCAL_USER_NAME_KEY, data.userName)
      history.push('/dashboard')
    })
  }
  return (
    <div className={styles.loginPage}>
      <h1 className={styles.title}>NestBlog</h1>
      <Form className={styles.form} labelCol={{ span: 0 }} wrapperCol={{ span: 24 }} form={form}>
        <Form.Item label="用户名" name="name" rules={[{ required: true, message: '请输入用户名' }]}>
          <Input size="large" prefix={<UserOutlined />} placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
          <Input
            size="large"
            prefix={<LockOutlined />}
            type="password"
            placeholder="请输入密码"
            onPressEnter={onSubmit}
          />
        </Form.Item>
        <Form.Item>
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
  )
}

export default inject('userStore')(LoginPage)
