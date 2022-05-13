import { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import { RoleStore } from '@/store'
import styles from './Role.less'
import { Modal, message, Menu, Dropdown, Tag } from 'antd'
import classnames from 'classnames'
import AddModal from './RoleAddModal'
import { useSetState } from 'ahooks'
import { DownOutlined } from '@ant-design/icons'

interface IProps {
  roleStore?: RoleStore
}

interface IModalProps {
  visible?: boolean
  type?: 'add' | 'edit' | undefined
  record?: Record<string, any>
}

const RoleList = ({ roleStore }: IProps) => {
  const [modalProps, setModalProps] = useSetState<IModalProps>({ visible: false })

  useEffect(() => {
    onReload()
  }, [])

  const onReload = async () => {
    await roleStore.get()
    onSelected(roleStore.result?.[0])
  }

  const onSelected = record => {
    roleStore.set('detail', record)
  }

  const onDelete = async id => {
    Modal.confirm({
      title: '确定删除选中角色？',
      onOk: async () => {
        await roleStore.delete({ id })
        message.success('删除成功')
        onReload()
      },
    })
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        角色列表
        <a onClick={() => setModalProps({ type: 'add', record: {} })}>创建角色</a>
      </div>
      <ul className={styles.list}>
        {roleStore.result?.map(item => (
          <li
            key={item.id}
            className={classnames(styles.item, {
              [styles.active]: roleStore.detail.id === item.id,
            })}
            onClick={() => onSelected(item)}
          >
            <div className={styles.name}>{item.name}</div>
            <div>
              {item.enable === 0 && <Tag color="red">已停用</Tag>}
              <Dropdown
                trigger={['click']}
                overlay={
                  <Menu>
                    <Menu.Item key="edit">
                      <a
                        onClick={() => setModalProps({ visible: true, type: 'edit', record: item })}
                      >
                        编辑
                      </a>
                    </Menu.Item>
                    <Menu.Item key="add">
                      <a style={{ color: 'red' }} onClick={() => onDelete(item.id)}>
                        删除
                      </a>
                    </Menu.Item>
                  </Menu>
                }
              >
                <DownOutlined style={{ color: '#ccc', fontSize: 14 }} />
              </Dropdown>
            </div>
          </li>
        ))}
      </ul>
      {modalProps.visible && (
        <AddModal
          detail={modalProps.record || {}}
          onSuccess={() => {
            roleStore.get()
            setModalProps({ visible: false })
          }}
          onCancel={() => setModalProps({ visible: false })}
        />
      )}
    </div>
  )
}

export default inject('roleStore')(observer(RoleList))
