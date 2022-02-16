import { useEffect, useState, useMemo } from 'react'
import { Button, Checkbox, Tabs, message } from 'antd'
import { inject, observer } from 'mobx-react'
import { AuthStore, RoleStore } from '@/store'
import AuthAddModal from './AuthAddModal'
import styles from './Auth.module.less'
import { toTree } from '@/utils/util'

const { Group: CheckboxGroup } = Checkbox

interface IProps {
  authStore?: AuthStore
  roleStore?: RoleStore
}

const AuthList = ({ authStore, roleStore }: IProps) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [selected, setSelected] = useState({})

  const loadData = async () => {
    await authStore.get()
  }

  useEffect(() => {
    loadData()
  }, [])

  const {
    detail: { id: roleId, auth_id = '' },
  } = roleStore
  const { result: authList } = authStore

  useEffect(() => {
    let values = {}
    authList?.map(({ id, pid }) => {
      if (auth_id?.includes(id)) {
        if (!values[pid]) values[pid] = []
        values[pid].push(id)
      }
    })
    setSelected({ ...values })
  }, [roleId])

  const listData = toTree(authList)

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
    return data.map(({ name, id, children = [] }) => (
      <div className={styles.row} key={id}>
        <Checkbox
          key={id}
          className={styles.title}
          indeterminate={selected[id]?.length && selected[id]?.length < children.length}
          onChange={e => onChangeAll(e, id)}
          checked={selected[id]?.length === children.length}
        >
          {name}
        </Checkbox>
        <div className={styles.children}>
          {children?.length ? (
            <CheckboxGroup
              options={children.map(({ name, id }) => ({ label: name, value: id }))}
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
    const { success, msg = '操作失败' } = await roleStore.update({
      id: roleId,
      auth_id: authIds.toString(),
    })
    if (success) {
      message.success('操作成功')
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
    <div>
      <Tabs
        tabBarExtraContent={
          <>
            <Button
              type="primary"
              size="small"
              style={{ marginRight: 10 }}
              onClick={() => setModalVisible(true)}
            >
              新增权限
            </Button>
            <Button type="primary" size="small" onClick={onSave}>
              保存
            </Button>
          </>
        }
      >
        <Tabs.TabPane tab="模块功能" tabKey="1">
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
        </Tabs.TabPane>
      </Tabs>

      {modalVisible && (
        <AuthAddModal
          detail={{}}
          onSuccess={() => {
            loadData()
            setModalVisible(false)
          }}
          onCancel={() => setModalVisible(false)}
        />
      )}
    </div>
  )
}

export default inject('authStore', 'roleStore')(observer(AuthList))
