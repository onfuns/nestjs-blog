import { useEffect, useState } from 'react'
import { Form, Input, message, Modal, Radio, Select } from 'antd'
import { AuthStore } from '@/store'
import { inject, observer } from 'mobx-react'
const { Option } = Select

interface IProps {
  authStore?: AuthStore
  onSuccess: () => void
  onCancel: () => void
  detail: Record<string, any>
}

const AddFormModal = ({ authStore, onSuccess, onCancel, detail }: IProps) => {
  const [formVaules, setFormValues] = useState({} as any)
  const [form] = Form.useForm()
  const { setFieldsValue, validateFields } = form

  useEffect(() => {
    if (!!detail.id) {
      setFieldsValue({ ...detail })
      setFormValues({ ...detail })
    }
  }, [])

  const onFinish = () => {
    validateFields().then(async values => {
      const params = {
        ...values,
      }
      let fn = authStore.add
      // 编辑
      if (!!detail.id) {
        fn = authStore.update
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

  const { result: authList } = authStore
  const optionsList = authList.filter(a => a.type === '1') //筛选模块

  return (
    <Modal
      title="权限信息"
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
        onValuesChange={(_, values) => setFormValues(values)}
        initialValues={{ type: '1' }}
      >
        <Form.Item label="类型" name="type" rules={[{ required: true, message: '请选择类型' }]}>
          <Radio.Group>
            <Radio value="1">模块</Radio>
            <Radio value="2">功能</Radio>
          </Radio.Group>
        </Form.Item>

        {formVaules.type === '2' && (
          <Form.Item label="模块" name="pid" rules={[{ required: true, message: '请选择模块' }]}>
            <Select placeholder="请选择模块">
              {optionsList.map(({ name, id }) => (
                <Option key={id} value={id}>
                  {name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}

        <Form.Item label="名称" name="name" rules={[{ required: true, message: '请输入名称' }]}>
          <Input placeholder="请输入名称" />
        </Form.Item>

        <Form.Item label="路径" name="code" rules={[{ required: true, message: '请输入路径' }]}>
          <Input placeholder="请输入路径" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default inject('authStore')(observer(AddFormModal))
