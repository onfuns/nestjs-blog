import { useEffect, useState } from 'react'
import { Modal, Tree } from 'antd'
import { inject, observer } from 'mobx-react'
import { AuthStore } from '@/store'
import { toTree } from '@/utils'
import { cloneDeep } from 'lodash'
interface IProps {
  authStore?: AuthStore
  onSuccess?: () => void
  onCancel?: () => void
  detail?: Record<any, string>
}

const AuthTree = ({ authStore, detail, onSuccess, onCancel }: IProps) => {
  const [selectedKeys, setSelectedKeys] = useState<number[]>([])

  useEffect(() => {
    ;(async () => {
      await authStore.get({ roleId: detail.id })
      setSelectedKeys([])
    })()
  }, [])

  const onSelect = value => {
    setSelectedKeys([...value])
  }

  const listData = toTree(cloneDeep(authStore.result))

  return (
    <Modal
      title="权限配置"
      visible={true}
      width={600}
      onOk={onSuccess}
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
