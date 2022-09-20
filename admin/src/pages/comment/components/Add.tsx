import { Form, Input, message, Modal } from 'antd'
import { updateComment } from '@/actions/comment'

export default function CommentAdd({ onSuccess, onCancel, detail }: IDetailModalProps) {
  const [form] = Form.useForm()

  const onFinish = async () => {
    const values = await form.validateFields()
    await updateComment(detail.id, values)
    message.success('操作成功')
    onSuccess()
  }

  return (
    <Modal
      title="评论信息"
      visible={true}
      width={800}
      onOk={onFinish}
      onCancel={onCancel}
      destroyOnClose
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        form={form}
        initialValues={{ reply: detail.reply || '' }}
      >
        <Form.Item label="回复内容" name="reply">
          <Input.TextArea placeholder="请输入回复内容" />
        </Form.Item>
      </Form>
    </Modal>
  )
}
