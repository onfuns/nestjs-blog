import { useEffect, useState } from 'react'
import { Table, Button, Popconfirm, TableProps, Switch } from 'antd'
import UserAddModal from './UserAddModal'
import { inject, observer } from 'mobx-react'
import { UserStore, RoleStore } from '@/store'

const UserList = ({ userStore, roleStore }: { userStore?: UserStore; roleStore?: RoleStore }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [recordInfo, setRecordInfo] = useState({} as any)
  const [reloadId, setReloadId] = useState(null)
  const {
    detail: { id: roleId },
    result: roleList = [],
  } = roleStore

  useEffect(() => {
    roleId && userStore.get({ roleId })
  }, [roleId, reloadId])

  const onAction = async (record: any = {}, type: 'add' | 'edit' | 'delete') => {
    if (type === 'add' || type === 'edit') {
      setRecordInfo({ ...record })
      setModalVisible(true)
    } else if (type === 'delete') {
      await userStore.delete({ id: record.id })
      setReloadId(new Date())
    } else {
      console.log('do nothing')
    }
  }

  const { result: userList } = userStore

  const columns = [
    {
      title: '用户名',
      dataIndex: 'name',
    },
    {
      title: '角色',
      dataIndex: 'role_id',
      render: value => {
        return value
          .split(',')
          .map(v => {
            const { name } = roleList.find(r => r.id === Number(v)) || {}
            return name
          })
          .join(',')
      },
    },
    {
      title: '启用状态',
      dataIndex: 'enable',
      render: value => <Switch checked={value === 1} size="small" />,
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (value, record) => {
        return (
          <div>
            <Button size="small" onClick={() => onAction(record, 'edit')}>
              编辑
            </Button>
            {record.pid === 0 && record?.children?.length ? null : (
              <Popconfirm title="确定删除？" onConfirm={() => onAction(record, 'delete')}>
                <Button size="small" danger style={{ marginLeft: 10 }}>
                  删除
                </Button>
              </Popconfirm>
            )}
          </div>
        )
      },
    },
  ]
  const tableProps: TableProps<any> = {
    columns,
    dataSource: userList,
    rowKey: ({ id }) => id,
    pagination: false,
    bordered: true,
    size: 'small',
  }

  return (
    <div>
      <Button
        type="primary"
        size="small"
        style={{ marginBottom: 10, float: 'right' }}
        onClick={() => onAction(undefined, 'add')}
      >
        新增用户
      </Button>
      <Table {...tableProps} />
      {modalVisible && (
        <UserAddModal
          onSuccess={() => {
            setModalVisible(false)
            setReloadId(new Date())
          }}
          roleList={roleList}
          onCancel={() => setModalVisible(false)}
          detail={recordInfo}
        />
      )}
    </div>
  )
}

export default inject('userStore', 'roleStore')(observer(UserList))
