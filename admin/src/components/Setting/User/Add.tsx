import { useEffect } from 'react'
import { Form, Input, message, Modal, Radio, Select } from 'antd'
import * as md5 from 'md5'
import { UserStore, RoleStore } from '@/store'
import { inject, observer } from 'mobx-react'
const { Option } = Select

interface IProps {
  userStore?: UserStore
  roleStore?: RoleStore
  onSuccess: () => void
  onCancel: () => void
  detail: Record<string, any>
}

const Add = ({ userStore, roleStore, onSuccess, onCancel, detail }: IProps) => {
  const [form] = Form.useForm()
  const isEdit = !!detail.id

  useEffect(() => {
    ;(async () => {
      await roleStore.get()
      if (isEdit) {
        form.setFieldsValue({ ...detail, roles: detail.roles?.map(r => r.id) })
      }
    })()
  }, [])

  const onFinish = () => {
    form.validateFields().then(async values => {
      const params = {
        ...values,
        roles: values.roles.map(id => ({ id })),
      }
      let fn = userStore.add
      if (isEdit) {
        fn = userStore.update
        params.id = detail.id
      } else {
        params.password = md5(values.password)
      }
      const { success } = await fn(params)
      if (success) {
        message.success('操作成功')
        onSuccess()
      }
    })
  }

  return (
    <Modal
      title="用户信息"
      visible={true}
      width={600}
      onOk={onFinish}
      onCancel={onCancel}
      destroyOnClose
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        form={form}
        initialValues={{
          enable: 1,
        }}
      >
        <Form.Item label="用户名" name="name" rules={[{ required: true }]}>
          <Input placeholder="请输入用户名" />
        </Form.Item>

        {!isEdit && (
          <Form.Item label="密码" name="password" rules={[{ required: true }]}>
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
        )}

        <Form.Item label="所属角色" name="roles" rules={[{ required: true }]}>
          <Select mode="multiple">
            {roleStore.result?.map((r: any) => (
              <Option key={r.id} value={r.id}>
                {r.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="状态" name="enable" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value={1}>启用</Radio>
            <Radio value={0}>停用</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default inject('userStore', 'roleStore')(observer(Add))
