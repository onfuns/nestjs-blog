import { Form, Input, message, Modal } from 'antd'
import { CommentStore } from '@/store'
import { inject } from 'mobx-react'
interface IProps {
  commentStore?: CommentStore
  onSuccess: () => void
  onCancel: () => void
  detail: Record<string, any>
}

const AddFormModal = ({ commentStore, onSuccess, onCancel, detail }: IProps) => {
  const [form] = Form.useForm()

  const onFinish = () => {
    form.validateFields().then(async values => {
      await commentStore.update(detail.id, values)
      message.success('操作成功')
      onSuccess()
    })
  }

  return (
    <Modal
      title="评论信息"
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
        initialValues={{ reply: detail.reply || '' }}
      >
        <Form.Item label="回复内容" name="reply">
          <Input.TextArea placeholder="请输入回复内容" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default inject('commentStore')(AddFormModal)
