import { useEffect } from 'react'
import { Form, Input, message, Modal, Radio, Select } from 'antd'
import * as md5 from 'md5'
import { UserStore } from '@/store'
import { inject, observer } from 'mobx-react'
const { Option } = Select

interface IProps {
  userStore?: UserStore
  roleList?: any[]
  onSuccess: () => void
  onCancel: () => void
  detail: Record<string, any>
}

const AddFormModal = ({ userStore, roleList, onSuccess, onCancel, detail }: IProps) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (!!detail.id) {
      form.setFieldsValue({ ...detail, role_id: detail.role_id.split(',').map(r => Number(r)) })
    }
  }, [])

  const onFinish = () => {
    form.validateFields().then(async values => {
      const params = {
        ...values,
        role_id: values.role_id.toString(),
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
        }}
      >
        <Form.Item label="用户名" name="name" rules={[{ required: true, message: '请输入用户名' }]}>
          <Input placeholder="请输入用户名" />
        </Form.Item>

        {isEdit ? null : (
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
        )}

        <Form.Item label="角色" name="role_id" rules={[{ required: true, message: '请选择角色' }]}>
          <Select mode="multiple">
            {roleList.map((r: any) => (
              <Option key={r.id} value={r.id}>
                {r.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="状态" name="enable" rules={[{ required: true, message: '请选择状态' }]}>
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
