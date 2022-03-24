import { useEffect, useState } from 'react'
import { Form, Input, message, Modal, Radio, Select, Checkbox } from 'antd'
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
  const [formVaules, setFormValues] = useState<any>({ type: 1 })
  const [form] = Form.useForm()

  useEffect(() => {
    if (!!detail.id) {
      form.setFieldsValue({ ...detail })
      setFormValues({ ...detail })
    }
  }, [])

  const onFinish = () => {
    form.validateFields().then(async values => {
      const params = {
        ...values,
      }
      let fn = authStore.add
      // 编辑
      if (!!detail.id) {
        fn = authStore.update
        params.id = detail.id
      }
      const { success } = await fn(params)
      if (success) {
        message.success('操作成功')
        onSuccess()
      }
    })
  }

  const { result: authList } = authStore
  const optionsList = authList.filter(a => a.type === '1') //筛选模块

  return (
    <Modal
      title="权限信息"
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
        onValuesChange={(_, values) => setFormValues(values)}
        initialValues={{ type: 1 }}
      >
        <Form.Item label="类型" name="type" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value={1}>菜单</Radio>
            <Radio value={2}>功能</Radio>
          </Radio.Group>
        </Form.Item>

        {formVaules.type === 1 && (
          <>
            <Form.Item label="所属菜单" name="pid" rules={[{ required: true }]}>
              <Select placeholder="请选择">
                <Option value={0}>一级菜单</Option>
                {optionsList.map(({ name, id }) => (
                  <Option key={id} value={id}>
                    {name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="名称" name="name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item label="编码" name="code" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </>
        )}

        {formVaules.type === 2 && (
          <>
            <Form.Item label="所属菜单" name="pid" rules={[{ required: true }]}>
              <Select placeholder="请选择">
                {optionsList.map(({ name, id }) => (
                  <Option key={id} value={id}>
                    {name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="功能项" name="name" rules={[{ required: true }]}>
              <Checkbox.Group>
                <Checkbox value="1">仅查看</Checkbox>
                <Checkbox value="2">可编辑</Checkbox>
              </Checkbox.Group>
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  )
}

export default inject('authStore')(observer(AddFormModal))
