import { useEffect, useState, useMemo } from 'react'
import { Button, Checkbox, message, Popconfirm, Space, Card } from 'antd'
import { inject, observer } from 'mobx-react'
import { AuthStore, RoleStore } from '@/store'
import AuthAddModal from './AuthAddModal'
import styles from './Auth.less'
import { toTree } from '@/utils/util'
import { cloneDeep } from 'lodash'
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
  const [selected, setSelected] = useState({})
  const {
    detail: { id: roleId, auth_id },
  } = roleStore

  useEffect(() => {
    const loadData = async () => {
      await authStore.get()
      let values = {}
      authStore.result.map(({ id, pid }) => {
        if (auth_id?.includes(id)) {
          if (!values[pid]) values[pid] = []
          values[pid].push(id)
        }
      })
      setSelected({ ...values })
    }
    loadData()
  }, [roleId])

  const onSetModalProps = (props: IModalProps = {}) => {
    setModalProps({ ...modalProps, visible: !modalProps.visible, ...props })
  }

  const listData = toTree(cloneDeep(authStore.result))
  const onChangeAll = (e, id) => {
    let values = selected
    //选择全部
    if (id === 'all') {
      if (e.target.checked) {
        listData.map(d => {
          if (d.children) values[d.id] = d.children.map(c => c.id)
        })
      } else {
        values = {}
      }
    } else {
      if (e.target.checked) {
        const { children = [] } = listData.find(d => d.id === id) || {}
        values[id] = children.map(c => c.id)
      } else {
        values[id] = []
      }
    }
    setSelected({ ...values })
  }

  const onChange = (list, id) => {
    selected[id] = list
    setSelected({ ...selected })
  }

  const renderData = data => {
    return data.map(({ name, id, code, children = [] }) => (
      <div className={styles.row} key={id}>
        <Checkbox
          key={id}
          className={styles.title}
          indeterminate={selected[id]?.length && selected[id]?.length < children.length}
          onChange={e => onChangeAll(e, id)}
          checked={selected[id]?.length === children.length}
        >
          {name}
          <i className={styles.code}>({code})</i>
        </Checkbox>
        <div className={styles.children}>
          {children?.length ? (
            <Checkbox.Group
              options={children.map(({ name, code, id }) => ({
                label: (
                  <>
                    {name}
                    <i className={styles.code}>({code})</i>
                  </>
                ),
                value: id,
              }))}
              value={selected[id] || []}
              onChange={list => onChange(list, id)}
            />
          ) : null}
        </div>
      </div>
    ))
  }

  const onSave = async () => {
    let authIds = []
    for (const [, value] of Object.entries(selected)) {
      authIds.push(...(value as any))
    }
    const { success, msg = '保存失败' } = await roleStore.update({
      id: roleId,
      auth_id: authIds.toString(),
    })
    if (success) {
      message.success('保存成功')
    } else {
      message.error(msg)
    }
  }

  const allLen = useMemo(
    () => listData.reduce((total, { children }) => total + (children || []).length, 0),
    [listData],
  )
  const selectedLen = useMemo(
    () => Object.keys(selected).reduce((total, key) => total + selected[key].length, 0),
    [selected],
  )

  return (
    <>
      <Card
        title="模块功能"
        extra={
          <Space>
            <Button type="primary" onClick={() => onSetModalProps({ visible: true })}>
              新增权限
            </Button>
            <Popconfirm title="确定保存？" onConfirm={onSave}>
              <Button type="primary">保存</Button>
            </Popconfirm>
          </Space>
        }
        bordered={false}
      >
        <div className={styles.row}>
          <Checkbox
            className={styles.title}
            indeterminate={selectedLen && selectedLen < allLen}
            onChange={e => onChangeAll(e, 'all')}
            checked={allLen && allLen === selectedLen}
          >
            全部
          </Checkbox>
        </div>
        {renderData(listData)}
      </Card>

      {modalProps.visible && (
        <AuthAddModal
          detail={modalProps.record}
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
