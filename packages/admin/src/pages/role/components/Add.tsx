import { getAuthList } from '@/actions/auth'
import { addRole, updateRole } from '@/actions/role'
import { toTree } from '@/utils'
import {
  DrawerForm,
  ProForm,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components'
import { useRequest } from 'ahooks'
import { message, Tree } from 'antd'
import { cloneDeep } from 'lodash'
import { useEffect, useState } from 'react'

export const RoleAdd = ({ element, onSuccess, onClose, detail }: IDetailModalProps) => {
  const [form] = ProForm.useForm()
  const { data: { data: authList = [] } = {} } = useRequest(() =>
    getAuthList({ roleId: detail.id }),
  )
  const [selectedKeys, setSelectedKeys] = useState<number[]>([])

  useEffect(() => {
    if (detail.id) {
      form.setFieldsValue({ ...detail })
    }
  }, [])

  const onFinish = async () => {
    const values = await form.validateFields()
    //这里有个注意点，因为tree是完全受控的，所以当点击取消勾选子节点时，父级的节点也不会出现在 selectedKeys里
    //比如 勾选状态下二级结构是[30000,30001,30002]，取消勾选30002子节点后直接变成 [30001]，应该是 [30000,30001]
    //所以需要遍历数组找到其父级节点去重后放进去
    const resources: any = new Set()

    const findAllParent = (id, result = []) => {
      const current = authList?.find((auth) => auth.id === id)
      result.push(id)
      if (current && current.pid !== 0) {
        return findAllParent(current.pid, result)
      }
      return result
    }

    selectedKeys.map((id) => {
      //递归找到其所有父级
      findAllParent(id).map((id) => resources.add(id))
    })
    const params = {
      ...values,
      auths: [...resources].map((id) => ({ id })),
    }
    if (detail.id) {
      await updateRole(detail.id, params)
    } else {
      await addRole(params)
    }
    message.success('操作成功')
    onSuccess?.()
  }

  const treeList = toTree(cloneDeep(authList))

  return (
    <DrawerForm
      title="角色信息"
      trigger={element}
      drawerProps={{ onClose: onClose, destroyOnClose: true }}
      onFinish={onFinish}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      form={form}
      initialValues={{ enable: 1 }}
    >
      <ProFormText
        label="名称"
        name="name"
        rules={[{ required: true }]}
        placeholder="请输入名称"
        fieldProps={{ maxLength: 10 }}
      />

      <ProFormTextArea
        label="描述"
        name="description"
        rules={[{ required: true }]}
        placeholder="请输入描述"
        fieldProps={{ showCount: true, maxLength: 200 }}
      />

      <ProFormRadio.Group
        label="启用"
        name="enable"
        rules={[{ required: true }]}
        options={[
          { label: '是', value: 1 },
          { label: '否', value: 0 },
        ]}
      />

      {treeList.length ? (
        <ProForm.Item label="权限配置">
          <Tree
            checkable
            defaultExpandAll
            checkedKeys={selectedKeys}
            onCheck={(value: any) => setSelectedKeys([...value])}
            fieldNames={{ title: 'name', key: 'id', children: 'children' }}
            treeData={treeList}
          />
        </ProForm.Item>
      ) : null}
    </DrawerForm>
  )
}
