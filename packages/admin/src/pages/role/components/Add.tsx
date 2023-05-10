import { getAuthList } from '@/actions/auth'
import { addRole, updateRole } from '@/actions/role'
import Drawer from '@/components/Drawer'
import { useFetch } from '@/hooks'
import { toTree } from '@/utils'
import { Form, Input, message, Radio, Tree } from 'antd'
import { cloneDeep } from 'lodash'
import { useEffect, useState } from 'react'

export default function RoleAdd({ onSuccess, onCancel, detail }: IDetailModalProps) {
  const [form] = Form.useForm()
  const roleId = detail.id
  const [{ data: authList = [] }] = useFetch(getAuthList, { roleId }, [roleId])
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

    const findAllParent = (id, result: any[] = []) => {
      const current = authList?.find((s) => s.id === id) || {}
      result.push(id)
      if (current.pid !== 0) return findAllParent(current.pid, result)
      return result
    }

    selectedKeys.map((id) => {
      //递归找到其所有父级
      const ids = findAllParent(id)
      ids.map((id) => resources.add(id))
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
    onSuccess()
  }

  const onSelect = (value) => {
    setSelectedKeys([...value])
  }

  const dataList = toTree(cloneDeep(authList))

  return (
    <Drawer title="角色信息" visible={true} onSubmit={onFinish} onClose={onCancel} destroyOnClose>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        form={form}
        initialValues={{ enable: 1 }}
      >
        <Form.Item label="名称" name="name" rules={[{ required: true }]}>
          <Input placeholder="请输入名称" maxLength={10} />
        </Form.Item>

        <Form.Item label="描述" name="description">
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="启用" name="enable" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value={1}>是</Radio>
            <Radio value={0}>否</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="权限配置">
          {!!dataList.length && (
            <Tree
              checkable
              defaultExpandAll
              checkedKeys={selectedKeys}
              onCheck={onSelect}
              fieldNames={{ title: 'name', key: 'id', children: 'children' }}
              treeData={dataList}
            />
          )}
        </Form.Item>
      </Form>
    </Drawer>
  )
}
