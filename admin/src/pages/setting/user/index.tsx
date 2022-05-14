import { useRef } from 'react'
import { Button, Popconfirm, Space, message, Tag } from 'antd'
import AddModal from '@/components/Setting/User/Add'
import { inject, observer } from 'mobx-react'
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table'
import { UserStore } from '@/store'
import dayjs from 'dayjs'
import { useSetState } from 'ahooks'

interface IModalProps {
  visible?: boolean
  type?: 'add' | 'edit' | undefined
  record?: Record<string, any>
}

const fromatDate = date => date && dayjs(date).format('YYYY-MM-DD HH:mm')

const UserList = ({ userStore }: { userStore?: UserStore }) => {
  const actionRef = useRef<ActionType>()
  const [modalProps, setModalProps] = useSetState<IModalProps>({ visible: false })

  const onLoadData = () => {
    actionRef?.current.reload()
  }

  const onAction = async (
    type: 'add' | 'edit' | 'delete',
    record: Record<string, any> | undefined = {},
  ) => {
    if (type === 'add' || type === 'edit') {
      setModalProps({ visible: true, record })
    } else if (type === 'delete') {
      await userStore.delete({ id: record.id })
      message.success('操作成功')
      onLoadData()
    }
  }

  const columns: ProColumns<any>[] = [
    {
      title: '用户名',
      dataIndex: 'name',
      ellipsis: true,
      width: 150,
    },
    {
      title: '所属角色',
      dataIndex: 'roles',
      render: (_, record) => {
        return record?.roles?.map(r => (
          <Tag key={r.id} color="blue">
            {r.name}
          </Tag>
        ))
      },
    },
    {
      title: '最后登录IP',
      dataIndex: 'last_login_ip',
      render: (_, { last_login_ip }) => last_login_ip && last_login_ip.replace('::ffff:', ''),
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      render: (_, { created_at }) => fromatDate(created_at),
    },
    {
      title: '最后登录时间',
      dataIndex: 'last_login_at',
      render: (_, { last_login_at }) => fromatDate(last_login_at),
    },
    {
      title: '状态',
      dataIndex: 'enable',
      hideInSearch: true,
      render: value => (
        <Tag color={value === 1 ? 'success' : 'error'}>{value === 1 ? '正常' : '停用'}</Tag>
      ),
      width: 80,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 120,
      render: (_, record) => {
        return (
          <Space>
            <a onClick={() => onAction('edit', record)}>编辑</a>
            {record.pid === 0 && record?.children?.length ? null : (
              <Popconfirm title="确定删除？" onConfirm={() => onAction('delete', record)}>
                <a className="danger">删除</a>
              </Popconfirm>
            )}
          </Space>
        )
      },
    },
  ]

  return (
    <>
      <ProTable<any>
        actionRef={actionRef}
        columns={columns}
        headerTitle="用户列表"
        form={{ autoFocusFirstInput: false }}
        search={false}
        rowKey="id"
        request={async (params = {}) => {
          await userStore.get({ ...params })
          return { success: true, data: userStore.result }
        }}
        pagination={false}
        toolBarRender={() => [
          <Button key="add" type="primary" onClick={() => onAction('add', {})}>
            新增
          </Button>,
        ]}
        defaultSize="small"
      />

      {modalProps.visible && (
        <AddModal
          detail={modalProps.record}
          onSuccess={() => {
            setModalProps({ visible: false })
            onLoadData()
          }}
          onCancel={() => setModalProps({ visible: false })}
        />
      )}
    </>
  )
}

export default inject('userStore', 'roleStore')(observer(UserList))
