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

const AddFormModal = ({ userStore, roleStore, onSuccess, onCancel, detail }: IProps) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (!!detail.id) {
      form.setFieldsValue({ ...detail })
    }
  }, [])

  const onFinish = () => {
    form.validateFields().then(async values => {
      const params = {
        ...values,
      }
      let fn = userStore.add
      // 编辑
      if (!!detail.id) {
        fn = userStore.update
        params.id = detail.id
      } else {
        params.password = md5(values.password)
      }
      const { success, msg = '操作失败' } = await fn(params)
      if (success) {
        message.success('操作成功')
        onSuccess()
      } else {
        message.error(msg)
      }
    })
  }

  const isEdit = !!detail.id

  return (
    <Modal
      title="用户信息"
      visible={true}
      width={500}
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
          role_id: roleStore?.detail?.id,
        }}
      >
        <Form.Item label="用户名" name="name" rules={[{ required: true }]}>
          <Input placeholder="请输入用户名" />
        </Form.Item>

        {isEdit ? null : (
          <Form.Item label="密码" name="password" rules={[{ required: true }]}>
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
        )}

        <Form.Item label="角色" name="role_id" rules={[{ required: true }]}>
          <Select>
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
            <Radio value={0}>禁用</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default inject('userStore', 'roleStore')(observer(AddFormModal))
