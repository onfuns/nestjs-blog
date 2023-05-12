import { updateComment } from '@/actions/comment'
import { ModalForm, ProForm, ProFormTextArea } from '@ant-design/pro-components'
import { message } from 'antd'

export const CommentAdd = ({ element, onSuccess, onClose, detail }: IDetailModalProps) => {
  const [form] = ProForm.useForm()

  const onFinish = async () => {
    const values = await form.validateFields()
    await updateComment(detail.id, values)
    message.success('操作成功')
    onSuccess?.()
  }

  return (
    <ModalForm
      title="评论信息"
      trigger={element}
      modalProps={{
        destroyOnClose: true,
        onOk: onFinish,
        onCancel: onClose,
      }}
      width={800}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      form={form}
      initialValues={{ reply: detail?.reply }}
    >
      <ProFormTextArea label="回复内容" name="reply" placeholder="请输入回复内容" />
    </ModalForm>
  )
}
