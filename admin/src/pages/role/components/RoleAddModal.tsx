import { useEffect } from 'react'
import { Form, Input, message, Modal, Radio } from 'antd'
import { observer } from 'mobx-react'
import { useStore } from '@/hooks'

export default observer(({ onSuccess, onCancel, detail }: IDetailModalProps) => {
  const { roleStore } = useStore()
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
        await roleStore.update(detail.id, params)
      } else {
        await roleStore.add(params)
      }
      message.success('操作成功')
      onSuccess()
    })
  }

  return (
    <Modal
      title="角色信息"
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
        initialValues={{ enable: 1 }}
      >
        <Form.Item label="名称" name="name" rules={[{ required: true }]}>
          <Input placeholder="请输入名称" maxLength={10} />
        </Form.Item>
        <Form.Item label="启用" name="enable" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value={1}>是</Radio>
            <Radio value={0}>否</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  )
})
