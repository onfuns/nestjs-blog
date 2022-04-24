import { useEffect, useState } from 'react'
import { Modal, Tree, message } from 'antd'
import { inject, observer } from 'mobx-react'
import { AuthStore, RoleStore } from '@/store'
import { toTree } from '@/utils'
import { cloneDeep } from 'lodash'
interface IProps {
  authStore?: AuthStore
  roleStore?: RoleStore
  onSuccess?: () => void
  onCancel?: () => void
  detail?: Record<any, any>
}

const AuthTree = ({ authStore, roleStore, detail, onSuccess, onCancel }: IProps) => {
  const [selectedKeys, setSelectedKeys] = useState<number[]>([])
  const { id: roleId, auths = [] } = detail

  useEffect(() => {
    ;(async () => {
      await authStore.get()
      //有权限且不是菜单，因为树是受控的，当子元素都选中父级肯定也会选中
      const keys = auths?.filter(d => d.type === 2).map(d => d.id)
      setSelectedKeys([...keys])
    })()
  }, [])

  const onSelect = value => {
    setSelectedKeys([...value])
  }

  const findAllParent = (id, result: any[] = []) => {
    const current = authStore.result.find(s => s.id === id) || {}
    result.push(id)
    if (current.pid !== 0) return findAllParent(current.pid, result)
    return result
  }

  const onSave = async () => {
    //这里有个注意点，因为tree是完全受控的，所以当点击取消勾选子节点时，父级的节点也不会出现在 selectedKeys里
    //比如 勾选状态下二级结构是[30000,30001,30002]，取消勾选30002子节点后直接变成 [30001]，应该是 [30000,30001]
    //所以需要遍历数组找到其父级节点去重后放进去
    const resources: any = new Set()
    selectedKeys.map(id => {
      //递归找到其所有父级
      const ids = findAllParent(id)
      ids.map(id => resources.add(id))
    })
    const { success } = await roleStore.update({
      id: roleId,
      auths: [...resources].map(id => ({ id })),
    })
    if (success) {
      message.success('保存成功')
      onSuccess()
    }
  }

  const listData = toTree(cloneDeep(authStore.result))

  return (
    <Modal
      title="权限配置"
      visible={true}
      width={600}
      onOk={onSave}
      onCancel={onCancel}
      destroyOnClose
    >
      {!!listData.length && (
        <Tree
          checkable
          defaultExpandAll
          checkedKeys={selectedKeys}
          onCheck={onSelect}
          fieldNames={{ title: 'name', key: 'id', children: 'children' }}
          treeData={listData}
        />
      )}
    </Modal>
  )
}

export default inject('authStore', 'roleStore')(observer(AuthTree))
