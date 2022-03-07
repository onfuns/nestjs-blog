import { useEffect, useState } from 'react'
import { inject, observer } from 'mobx-react'
import { RoleStore } from '@/store'
import styles from './Role.less'
import { Button } from 'antd'
import classnames from 'classnames'
import RoleAddModal from '@/components/Setting/User/RoleAddModal'

interface IProps {
  roleStore?: RoleStore
}

const RoleList = ({ roleStore }: IProps) => {
  const [modalProps, setModalProps] = useState({ visible: false, type: null })
  const [reloadId, setReloadId] = useState(null)

  useEffect(() => {
    roleStore.get()
  }, [reloadId])

  const onShow = (type: null | 'add' | 'edit' = null) => {
    const { visible } = modalProps
    setModalProps({ visible: !visible, type })
  }

  const onChange = (id: number) => {
    roleStore.getInfoById({ id })
  }

  const { result, detail } = roleStore

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>角色管理</h1>
        <Button type="primary" size="small" onClick={() => onShow('add')}>
          创建角色
        </Button>
        {modalProps.visible && (
          <RoleAddModal
            detail={modalProps.type === 'edit' ? detail : {}}
            onSuccess={() => {
              setReloadId(new Date())
              onShow()
            }}
            onCancel={onShow}
          />
        )}
      </div>
      <ul className={styles.list}>
        {result.map(item => (
          <li
            key={item.id}
            className={classnames(styles.item, { [styles.active]: detail.id === item.id })}
            onClick={() => onChange(item.id)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default inject('roleStore')(observer(RoleList))
