import { addTag, updateTag } from '@/actions/tag'
import { ModalForm, ProForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components'
import { message } from 'antd'

export const TagAdd = ({ element, onSuccess, onClose, detail = {} }: IDetailModalProps) => {
  const [form] = ProForm.useForm()

  const onFinish = async () => {
    const values = await form.validateFields()
    if (detail.id) {
      await updateTag(detail.id, values)
    } else {
      await addTag(values)
    }
    message.success('操作成功')
    onSuccess?.()
  }

  return (
    <ModalForm
      title="标签信息"
      trigger={element}
      modalProps={{ onOk: onFinish, onCancel: onClose, destroyOnClose: true }}
      initialValues={detail}
    >
      <ProFormText label="名称" name="name" rules={[{ required: true }]} placeholder="请输入名称" />

      <ProFormTextArea
        label="描述"
        name="description"
        rules={[{ required: true }]}
        placeholder="请输入描述"
        fieldProps={{ showCount: true, maxLength: 200 }}
      />
    </ModalForm>
  )
}
