import { useRef } from 'react'
import { Button, Popconfirm, Space, message, Tag } from 'antd'
import AddModal from './components/Add'
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table'
import dayjs from 'dayjs'
import { useMergeState } from '@/hooks'
import { getUserList, deleteUser } from '@/actions/user'

const fromatDate = date => date && dayjs(date).format('YYYY-MM-DD HH:mm')

export default () => {
  const actionRef = useRef<ActionType>()
  const [modalProps, setModalProps] = useMergeState<ICreateModalProps>({ visible: false })

  const onAction = async (
    type: 'add' | 'edit' | 'delete',
    record: ICreateModalProps['record'] = {},
  ) => {
    if (type === 'add' || type === 'edit') {
      setModalProps({ visible: true, record })
    } else if (type === 'delete') {
      await deleteUser(record.id)
      message.success('操作成功')
      actionRef?.current.reload()
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
        return record?.roles?.map(({ id, name }) => (
          <Tag key={id} color="blue">
            {name}
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
        return record.super !== 1 ? (
          <Space>
            <a onClick={() => onAction('edit', record)}>编辑</a>
            <Popconfirm title="确定删除？" onConfirm={() => onAction('delete', record)}>
              <a className="danger">删除</a>
            </Popconfirm>
          </Space>
        ) : null
      },
    },
  ]

  return (
    <>
      <ProTable<any>
        actionRef={actionRef}
        columns={columns}
        headerTitle="用户列表"
        search={false}
        rowKey="id"
        request={async (params = {}) => {
          return getUserList({ ...params })
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
            actionRef?.current.reload()
          }}
          onCancel={() => setModalProps({ visible: false })}
        />
      )}
    </>
  )
}
