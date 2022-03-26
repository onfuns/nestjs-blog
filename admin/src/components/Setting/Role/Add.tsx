import { useEffect } from 'react'
import { Form, Input, message, Modal, Radio } from 'antd'
import { RoleStore } from '@/store'
import { inject, observer } from 'mobx-react'

interface IProps {
  roleStore?: RoleStore
  onSuccess: () => void
  onCancel: () => void
  detail: Record<string, any>
}

const AddFormModal = ({ roleStore, onSuccess, onCancel, detail }: IProps) => {
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
      let fn = roleStore.add
      // 编辑
      if (!!detail.id) {
        fn = roleStore.update
        params.id = detail.id
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
      title="角色信息"
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
        initialValues={{ enable: 1 }}
      >
        <Form.Item label="名称" name="name" rules={[{ required: true }]}>
          <Input placeholder="请输入名称" />
        </Form.Item>

        <Form.Item label="描述" name="description" rules={[{ required: true }]}>
          <Input.TextArea placeholder="请输入描述" />
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

export default inject('roleStore')(observer(AddFormModal))
