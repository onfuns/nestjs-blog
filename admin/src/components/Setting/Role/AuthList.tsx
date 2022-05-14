import { useEffect, useState } from 'react'
import { Card, Button, message, Tree, Popconfirm, Space } from 'antd'
import { inject, observer } from 'mobx-react'
import { RoleStore, AuthStore } from '@/store'
import { toTree } from '@/utils'
import { cloneDeep } from 'lodash'
import AddModal from './AuthAddModal'
import { useSetState } from 'ahooks'
import styles from './Auth.less'

interface IProps {
  roleStore?: RoleStore
  authStore?: AuthStore
}

interface IModalProps {
  visible?: boolean
  type?: 'add' | 'edit' | undefined
  record?: Record<string, any>
}

const AuthList = ({ roleStore, authStore }: IProps) => {
  const [selectedKeys, setSelectedKeys] = useState<number[]>([])
  const [modalProps, setModalProps] = useSetState<IModalProps>({ visible: false })
  const { detail: { id: roleId, auths } = {} } = roleStore

  useEffect(() => {
    if (!roleId) return
    ;(async () => {
      await authStore.get({ roleId })
      //有权限且不是菜单，因为树是受控的，当子元素都选中父级肯定也会选中
      const keys = auths?.filter(d => d.type === 2).map(d => d.id)
      setSelectedKeys([...keys])
    })()
  }, [roleId])

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
    await roleStore.update({
      id: roleId,
      auths: [...resources].map(id => ({ id })),
    })
    message.success('保存成功')
    //刷新角色列表，切换角色时可以获取最新的角色权限数据
    roleStore.get()
  }

  const onDetele = async item => {
    if (item?.children?.length > 0) {
      return message.warn('请先删除子节点')
    }
    await roleStore.delete({ id: item.id })
    message.success('删除成功')
    authStore.get()
  }

  const listData = toTree(cloneDeep(authStore.result))

  return (
    <>
      <Card
        title="权限配置"
        size="small"
        style={{ width: '100%' }}
        extra={
          <Space style={{ padding: '0 10px' }}>
            <Button
              type="ghost"
              onClick={() => setModalProps({ visible: true, type: 'add', record: {} })}
            >
              新增权限
            </Button>
            <Popconfirm title="确定保存？" onConfirm={onSave} placement="topLeft">
              <Button type="primary">保存</Button>
            </Popconfirm>
          </Space>
        }
      >
        {!!listData.length && (
          <Tree
            className={styles.tree}
            checkable
            defaultExpandAll
            checkedKeys={selectedKeys}
            onCheck={onSelect}
            fieldNames={{ title: 'name', key: 'id', children: 'children' }}
            treeData={listData}
            titleRender={(node: any) => (
              <div className={styles.titleRow}>
                <span>{node.name}</span>
                <a onClick={() => setModalProps({ visible: true, type: 'edit', record: node })}>
                  编辑
                </a>
                <a style={{ color: 'red' }} onClick={() => onDetele(node)}>
                  删除
                </a>
              </div>
            )}
          />
        )}
      </Card>
      {modalProps.visible && (
        <AddModal
          detail={modalProps.record || {}}
          onSuccess={() => {
            authStore.get()
            setModalProps({ visible: false })
          }}
          onCancel={() => setModalProps({ visible: false })}
        />
      )}
    </>
  )
}

export default inject('roleStore', 'authStore')(observer(AuthList))
