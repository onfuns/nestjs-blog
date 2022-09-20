import { useEffect } from 'react'
import { Form, Input, message, Radio, Modal } from 'antd'
import CategoryCascader from '@/components/CategoryCascader'
import { updateCategory, addCategory } from '@/actions/category'

export default function CategoryAdd({ onSuccess, onCancel, detail }: IDetailModalProps) {
  const [form] = Form.useForm()
  const categoryType = Form.useWatch('type', form)

  useEffect(() => {
    if (detail.id) {
      form.setFieldsValue({ ...detail, pid: [detail.pid] })
    }
  }, [])

  const onFinish = () => {
    form.validateFields().then(async values => {
      const params = {
        ...values,
      }
      if (detail.id) {
        await updateCategory(detail.id, params)
      } else {
        await addCategory(params)
      }
      message.success('操作成功')
      onSuccess()
    })
  }

  return (
    <Modal
      title="分类信息"
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
        initialValues={{
          pid: [0],
          type: 1,
          status: 1,
        }}
      >
        <Form.Item label="所属分类" name="pid" rules={[{ required: true }]}>
          <CategoryCascader disabled={!!detail.id} />
        </Form.Item>

        <Form.Item label="名称" name="name" rules={[{ required: true }]}>
          <Input placeholder="请输入名称" />
        </Form.Item>

        <Form.Item label="链接" name="ename" rules={[{ required: true }]}>
          <Input placeholder="请输入链接，如 /front " />
        </Form.Item>

        <Form.Item label="类别" name="type" shouldUpdate rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value={1}>文章列表</Radio>
            {/* <Radio value={2}>单页</Radio> */}
            <Radio value={3}>外链</Radio>
          </Radio.Group>
        </Form.Item>

        {categoryType === 3 && (
          <Form.Item shouldUpdate label="外链地址" name="url" rules={[{ required: true }]}>
            <Input placeholder="请输入外链地址" />
          </Form.Item>
        )}

        <Form.Item label="图标" name="icon">
          <Input placeholder="iconfont 或 url" />
        </Form.Item>

        <Form.Item label="图标颜色" name="icon_color">
          <Input placeholder="只对iconfont 有效" />
        </Form.Item>

        <Form.Item label="展示" name="status">
          <Radio.Group>
            <Radio value={1}>是</Radio>
            <Radio value={0}>否</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  )
}
