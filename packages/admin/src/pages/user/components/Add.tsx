import { getRoleList } from '@/actions/role'
import { addUser, updateUser } from '@/actions/user'
import {
  ModalForm,
  ProForm,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components'
import { message } from 'antd'
import * as md5 from 'md5'
import { useEffect } from 'react'

export const UserAdd = ({ element, onSuccess, onClose, detail }: IDetailModalProps) => {
  const [form] = ProForm.useForm()
  const isEdit = !!detail.id

  useEffect(() => {
    if (isEdit) {
      form.setFieldsValue({ roles: detail?.roles?.map((role) => role.id) })
    }
  }, [])

  const onFinish = async () => {
    const values = await form.validateFields()
    const params = {
      ...values,
      roles: values.roles?.map((id) => ({ id })),
    }
    if (isEdit) {
      await updateUser(detail.id, params)
    } else {
      params.password = md5(values.password)
      await addUser(params)
    }
    message.success('操作成功')
    onSuccess?.()
  }

  return (
    <ModalForm
      title="用户信息"
      trigger={element}
      width={800}
      modalProps={{ onOk: onFinish, onCancel: onClose, destroyOnClose: true }}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      initialValues={{ enable: 1, ...detail }}
    >
      <ProFormText
        label="用户名"
        name="name"
        rules={[{ required: true }]}
        placeholder="请输入用户名"
      />

      {!isEdit && (
        <ProFormText.Password
          label="密码"
          name="password"
          rules={[{ required: true }]}
          placeholder="请输入密码"
        />
      )}
      <ProFormSelect
        label="所属角色"
        name="roles"
        rules={[{ required: true }]}
        placeholder="请选择角色"
        mode="multiple"
        request={async () => {
          const { data } = await getRoleList()
          return data?.map((item) => ({ label: item.name, value: item.id }))
        }}
      />

      <ProFormRadio.Group
        label="状态"
        name="enable"
        rules={[{ required: true }]}
        options={[
          { label: '启用', value: 1 },
          { label: '停用', value: 0 },
        ]}
      />
    </ModalForm>
  )
}
