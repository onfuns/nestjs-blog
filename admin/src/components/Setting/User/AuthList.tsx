import { useEffect, useState } from 'react'
import { Button, message, Popconfirm, Tree } from 'antd'
import { inject, observer } from 'mobx-react'
import { AuthStore, RoleStore } from '@/store'
import AuthAddModal from './AuthAddModal'
import { toTree } from '@/utils'
import { cloneDeep } from 'lodash'
import Auth from '@/components/Auth'
interface IProps {
  authStore?: AuthStore
  roleStore?: RoleStore
}

interface IModalProps {
  visible?: boolean
  record?: Record<string, any>
}

const AuthList = ({ authStore, roleStore }: IProps) => {
  const [modalProps, setModalProps] = useState<IModalProps>({ visible: false })
  const {
    detail: { id: roleId, auth_id = '' },
  } = roleStore

  const [selectedKeys, setSelectedKeys] = useState<number[]>([])

  useEffect(() => {
    if (!roleId) return
    ;(async () => {
      await authStore.get({ roleId })
      setSelectedKeys([])
    })()
  }, [roleId])

  const onSelect = value => {
    setSelectedKeys([...value])
  }

  const onSetModalProps = (props: IModalProps = {}) => {
    setModalProps({ ...modalProps, visible: !modalProps.visible, ...props })
  }

  const listData = toTree(cloneDeep(authStore.result))

  const onSave = async () => {
    let authIds = []
    const { success } = await roleStore.update({
      id: roleId,
      auth_id: authIds.toString(),
    })
    if (success) {
      message.success('保存成功')
    }
  }

  console.log(listData)

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 20 }}>
        <Button type="primary" onClick={() => onSetModalProps({ visible: true })}>
          新增权限
        </Button>
        <Auth empty={true}>
          <Popconfirm title="确定保存？" onConfirm={onSave} placement="topLeft">
            <Button type="primary">保存</Button>
          </Popconfirm>
        </Auth>
      </div>
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

      {modalProps.visible && (
        <AuthAddModal
          detail={modalProps.record || {}}
          onSuccess={() => {
            authStore.get()
            onSetModalProps({ visible: false })
          }}
          onCancel={() => onSetModalProps({ visible: false })}
        />
      )}
    </>
  )
}

export default inject('authStore', 'roleStore')(observer(AuthList))
