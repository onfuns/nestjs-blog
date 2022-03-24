import { useEffect, useState } from 'react'
import { inject, observer } from 'mobx-react'
import { RoleStore, UserStore } from '@/store'
import styles from './Role.less'
import { Button, Popconfirm, message, Menu, Dropdown } from 'antd'
import classnames from 'classnames'
import RoleAddModal from '@/components/Setting/User/RoleAddModal'
import { DownOutlined } from '@ant-design/icons'

interface IProps {
  roleStore?: RoleStore
  userStore?: UserStore
}

interface IModalProps {
  visible?: boolean
  type?: 'add' | 'edit' | undefined
  record?: Record<string, any>
}

const RoleList = ({ roleStore, userStore }: IProps) => {
  const [modalProps, setModalProps] = useState<IModalProps>({ visible: false })

  useEffect(() => {
    onLoadData()
  }, [])

  const onLoadData = async () => {
    await roleStore.get()
    onSelected(roleStore?.result?.[0])
  }

  const onSetModalProps = (props: IModalProps = {}) => {
    setModalProps({ ...modalProps, visible: !modalProps.visible, ...props })
  }

  const onSelected = record => {
    roleStore.set('detail', record)
  }

  const onDelete = async id => {
    if (userStore?.result?.length) {
      return message.warn('请先移出角色下用户后再删除')
    }
    const { success } = await roleStore.delete({ id })
    if (success) {
      message.success('删除成功')
      onLoadData()
    }
  }

  const { result, detail } = roleStore
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>角色管理</h1>
        <Button type="primary" onClick={() => onSetModalProps({ type: 'add' })}>
          创建角色
        </Button>
      </div>
      <ul className={styles.list}>
        {result.map(item => (
          <li
            key={item.id}
            className={classnames(styles.item, { [styles.active]: detail.id === item.id })}
            onClick={() => onSelected(item)}
          >
            {item.name}
            {item.type === 0 && (
              <Dropdown
                trigger={['click']}
                overlay={
                  <Menu>
                    <Menu.Item key="edit">
                      <a onClick={() => onSetModalProps({ record: item, type: 'edit' })}>编辑</a>
                    </Menu.Item>
                    <Menu.Item key="add">
                      <Popconfirm title="确定删除？" onConfirm={() => onDelete(item.id)}>
                        <a>删除</a>
                      </Popconfirm>
                    </Menu.Item>
                  </Menu>
                }
              >
                <DownOutlined style={{ color: '#ccc' }} />
              </Dropdown>
            )}
          </li>
        ))}
      </ul>
      {modalProps.visible && (
        <RoleAddModal
          detail={modalProps.record || {}}
          onSuccess={() => {
            roleStore.get()
            onSetModalProps()
          }}
          onCancel={onSetModalProps}
        />
      )}
    </div>
  )
}

export default inject('roleStore', 'userStore')(observer(RoleList))
