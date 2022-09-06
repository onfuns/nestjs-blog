import { useEffect } from 'react'
import { Form, Input, message, Modal, Radio, Cascader } from 'antd'
import { observer } from 'mobx-react'
import { cloneDeep } from 'lodash'
import { toTree } from '@/utils'
import { useStore } from '@/hooks'

export default observer(({ onSuccess, onCancel, detail }: IDetailModalProps) => {
  const { authStore } = useStore()
  const [form] = Form.useForm()

  useEffect(() => {
    if (!!detail.id) {
      console.log(findAllPid(detail.id))
      form.setFieldsValue({ ...detail, pid: detail.pid ? findAllPid(detail.id) : undefined })
    }
  }, [])

  const findAllPid = (id, result: any[] = []) => {
    const current = authStore.result.find(s => s.id === id) || {}
    result.push(id)
    if (current.pid !== 0) return findAllPid(current.pid, result)
    //只查出父级ID，不包含自己
    result.reverse()
    result.pop()
    return result
  }

  const onFinish = () => {
    form.validateFields().then(async values => {
      const params = {
        ...values,
        pid: values.pid.pop(),
      }
      if (!!detail.id) {
        await authStore.update(detail.id, params)
      } else {
        await authStore.add(params)
      }
      message.success('操作成功')
      onSuccess()
    })
  }

  //只过滤菜单
  const dataList = toTree(cloneDeep(authStore.result.filter(a => a.type === 1)))

  return (
    <Modal
      title="权限信息"
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
        initialValues={{ type: 1 }}
      >
        <Form.Item label="类型" name="type" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value={1}>菜单</Radio>
            <Radio value={2}>功能</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="所属菜单" name="pid" rules={[{ required: true }]}>
          <Cascader
            placeholder="请选择所属菜单"
            allowClear={false}
            options={[{ id: 0, name: '一级菜单' }].concat(dataList)}
            fieldNames={{ label: 'name', value: 'id', children: 'children' }}
            changeOnSelect
            getPopupContainer={(node: HTMLElement) => node.parentNode as HTMLElement}
          />
        </Form.Item>

        <Form.Item label="名称" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="编码"
          name="code"
          rules={[{ required: true }]}
          extra="带/前缀的 页面或接口路径，可用英文逗号分割"
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
})
