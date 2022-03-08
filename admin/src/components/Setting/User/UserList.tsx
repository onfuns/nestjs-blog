import { useEffect, useState } from 'react'
import { Table, Button, Popconfirm, TableProps, Switch, Space, message } from 'antd'
import UserAddModal from './UserAddModal'
import { inject, observer } from 'mobx-react'
import { UserStore, RoleStore } from '@/store'

interface IModalProps {
  visible?: boolean
  record?: Record<string, any>
}

const UserList = ({ userStore, roleStore }: { userStore?: UserStore; roleStore?: RoleStore }) => {
  const [modalProps, setModalProps] = useState<IModalProps>({ visible: false })
  const { detail: { id: roleId } = {}, result: roleList = [] } = roleStore

  useEffect(() => {
    onReload()
  }, [roleId])

  const onSetModalProps = (props: IModalProps = {}) => {
    setModalProps({ ...modalProps, visible: !modalProps.visible, ...props })
  }

  const onReload = () => {
    roleId && userStore.get({ roleId })
  }

  const onAction = async (record: any = {}, type: 'add' | 'edit' | 'delete') => {
    if (type === 'add' || type === 'edit') {
      onSetModalProps({ record, visible: true })
    } else if (type === 'delete') {
      const { success } = await userStore.delete({ id: record.id })
      if (success) {
        message.success('删除成功')
        onReload()
      } else {
        message.success('删除失败')
      }
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
      render: (value: string) => {
        //TODO 暂不支持多角色
        const { name } = roleList.find(r => r.id === Number(value)) || {}
        return name
      },
    },
    {
      title: '启用状态',
      dataIndex: 'enable',
      render: (value: number) => <Switch checked={value === 1} size="small" />,
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_, record) => {
        return (
          <Space>
            <Button size="small" onClick={() => onAction(record, 'edit')}>
              编辑
            </Button>
            {record.pid === 0 && record?.children?.length ? null : (
              <Popconfirm title="确定删除？" onConfirm={() => onAction(record, 'delete')}>
                <Button size="small" danger>
                  删除
                </Button>
              </Popconfirm>
            )}
          </Space>
        )
      },
    },
  ]
  const tableProps: TableProps<any> = {
    columns,
    dataSource: userList,
    rowKey: 'id',
    pagination: false,
    bordered: true,
    size: 'small',
  }

  return (
    <>
      <Button
        type="primary"
        style={{ marginBottom: 10, float: 'right' }}
        onClick={() => onAction(undefined, 'add')}
      >
        新增用户
      </Button>
      <Table {...tableProps} />
      {modalProps.visible && (
        <UserAddModal
          onSuccess={() => {
            onSetModalProps({ visible: false })
            onReload()
          }}
          onCancel={() => onSetModalProps({ visible: false })}
          detail={modalProps.record}
        />
      )}
    </>
  )
}

export default inject('userStore', 'roleStore')(observer(UserList))
