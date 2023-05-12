import { addAuth, getAuthList, updateAuth } from '@/actions/auth'
import { toTree } from '@/utils'
import {
  ModalForm,
  ProForm,
  ProFormCascader,
  ProFormRadio,
  ProFormText,
} from '@ant-design/pro-components'
import { useRequest } from 'ahooks'
import { message } from 'antd'
import { useEffect } from 'react'

export const AuthAdd = ({ element, onSuccess, onClose, detail }: IDetailModalProps) => {
  const [form] = ProForm.useForm()
  const { data: { data: authList = [] } = {} } = useRequest(getAuthList)

  useEffect(() => {
    if (detail.id) {
      const pid = detail.pid ? findAllPid(detail.id) : undefined
      form.setFieldsValue({ ...detail, pid })
    }
  }, [])

  const findAllPid = (id: number, result: any[] = []) => {
    const current = authList?.find((auth) => auth.id === id)
    result.push(id)
    if (current && current.pid !== 0) {
      return findAllPid(current.pid, result)
    }
    //只查出父级ID，不包含自己
    result.reverse()
    result.pop()
    return result
  }

  const onFinish = async () => {
    const values = await form.validateFields()
    const params = {
      ...values,
      pid: values.pid.pop(),
    }
    if (detail.id) {
      await updateAuth(detail.id, params)
    } else {
      await addAuth(params)
    }
    message.success('操作成功')
    onSuccess?.()
  }

  return (
    <ModalForm
      title="权限信息"
      width={800}
      trigger={element}
      modalProps={{ onOk: onFinish, onCancel: onClose, destroyOnClose: true }}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      form={form}
      initialValues={{ type: 1 }}
    >
      <ProFormRadio.Group
        label="类型"
        name="type"
        rules={[{ required: true }]}
        options={[
          { label: '菜单', value: 1 },
          { label: '功能', value: 2 },
        ]}
      />

      <ProFormCascader
        label="所属菜单"
        name="pid"
        rules={[{ required: true }]}
        placeholder="请选择所属菜单"
        allowClear={false}
        fieldProps={{
          options: [{ id: 0, name: '一级菜单' }].concat(
            toTree(authList.filter((auth) => auth.type === 1)), //只过滤菜单
          ),
          changeOnSelect: true,
          fieldNames: { label: 'name', value: 'id', children: 'children' },
        }}
      />

      <ProFormText label="名称" name="name" rules={[{ required: true }]} />

      <ProFormText
        label="编码"
        name="code"
        rules={[{ required: true }]}
        extra="唯一性，带/前缀的 页面或接口路径，可用英文逗号分割"
      />
    </ModalForm>
  )
}
