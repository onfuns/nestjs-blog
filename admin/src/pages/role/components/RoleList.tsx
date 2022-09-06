import { useEffect } from 'react'
import { observer } from 'mobx-react'
import styles from './Role.module.less'
import { Modal, Card, message, Menu, Dropdown, Tag } from 'antd'
import classnames from 'classnames'
import AddModal from './RoleAddModal'
import { useSetState } from 'ahooks'
import { DownOutlined } from '@ant-design/icons'
import { useStore } from '@/hooks'

export default observer(() => {
  const { roleStore } = useStore()
  const [modalProps, setModalProps] = useSetState<ICreateModalProps>({
    visible: false,
    record: undefined,
  })

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
        await roleStore.delete(id)
        message.success('删除成功')
        onReload()
      },
    })
  }

  return (
    <div className={styles.roles}>
      <Card
        title="角色列表"
        size="small"
        extra={
          <a onClick={() => setModalProps({ visible: true, type: 'add', record: undefined })}>
            创建角色
          </a>
        }
        className={styles.card}
      >
        <ul className={styles.list}>
          {roleStore.result?.map(role => (
            <li
              key={role.id}
              className={classnames(styles.item, {
                [styles.active]: roleStore.detail.id === role.id,
              })}
              onClick={() => onSelected(role)}
            >
              <div className={styles.name}>{role.name}</div>
              <div>
                {role.enable === 0 && <Tag color="red">已停用</Tag>}
                <Dropdown
                  trigger={['click']}
                  overlay={
                    <Menu
                      items={[
                        {
                          key: 'edit',
                          label: (
                            <a
                              onClick={() =>
                                setModalProps({ visible: true, type: 'edit', record: role })
                              }
                            >
                              编辑
                            </a>
                          ),
                        },
                        {
                          key: 'delete',
                          label: (
                            <a style={{ color: 'red' }} onClick={() => onDelete(role.id)}>
                              删除
                            </a>
                          ),
                        },
                      ]}
                    ></Menu>
                  }
                >
                  <DownOutlined style={{ color: '#ccc', fontSize: 14 }} />
                </Dropdown>
              </div>
            </li>
          ))}
        </ul>
      </Card>

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
})
