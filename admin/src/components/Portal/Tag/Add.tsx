import { useEffect } from 'react'
import { Form, Input, message, Radio, Modal } from 'antd'
import { TagStore } from '@/store'
import { inject } from 'mobx-react'

interface IProps {
  tagStore?: TagStore
  onSuccess: () => void
  onCancel: () => void
  detail: Record<string, any>
}

const AddFormModal = ({ tagStore, onSuccess, onCancel, detail }: IProps) => {
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
      let fn = tagStore.add
      if (detail.id) {
        fn = tagStore.update
        params.id = detail.id
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

export default inject('tagStore')(AddFormModal)
