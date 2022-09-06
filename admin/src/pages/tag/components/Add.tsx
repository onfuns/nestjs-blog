import { useEffect } from 'react'
import { Form, Input, message, Modal } from 'antd'
import { useStore } from '@/hooks'

export default ({ onSuccess, onCancel, detail }: IDetailModalProps) => {
  const { tagStore } = useStore()
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
      if (!!detail.id) {
        await tagStore.update(detail.id, params)
      } else {
        await tagStore.add(params)
      }
      message.success('操作成功')
      onSuccess()
    })
  }

  return (
    <Modal
      title="标签信息"
      visible={true}
      width={600}
      onOk={onFinish}
      onCancel={onCancel}
      destroyOnClose
    >
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} form={form}>
        <Form.Item label="名称" name="name" rules={[{ required: true }]}>
          <Input placeholder="请输入名称" />
        </Form.Item>

        <Form.Item label="描述" name="description">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  )
}
