import { deleteUser, getUserList } from '@/actions/user'
import { MINUTE_STRING } from '@/constants'
import { ProTable, type ActionType, type ProColumns } from '@ant-design/pro-components'
import { Button, message, Popconfirm, Space, Tag } from 'antd'
import dayjs from 'dayjs'
import { useRef } from 'react'
import { UserAdd } from './components/Add'

export default function UserPage() {
  const actionRef = useRef<ActionType>()

  const onDelete = async (id) => {
    await deleteUser(id)
    message.success('操作成功')
    onReload()
  }

  const onReload = () => actionRef?.current.reload()

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
      render: (_, { created_at }) => created_at && dayjs(created_at).format(MINUTE_STRING),
    },
    {
      title: '最后登录时间',
      dataIndex: 'last_login_at',
      render: (_, { last_login_at }) => last_login_at && dayjs(last_login_at).format(MINUTE_STRING),
    },
    {
      title: '状态',
      dataIndex: 'enable',
      hideInSearch: true,
      width: 80,
      render: (value) => {
        const isSuccess = value === 1
        return <Tag color={isSuccess ? 'success' : 'error'}>{isSuccess ? '正常' : '停用'}</Tag>
      },
    },
    {
      title: '操作',
      valueType: 'option',
      width: 120,
      render: (_, record) => {
        return record.super !== 1 ? (
          <Space>
            <UserAdd detail={record} onSuccess={onReload} element={<a>编辑</a>} />,
            <Popconfirm title="确定删除？" onConfirm={() => onDelete(record.id)}>
              <a className="danger">删除</a>
            </Popconfirm>
          </Space>
        ) : null
      },
    },
  ]

  return (
    <ProTable<any>
      actionRef={actionRef}
      columns={columns}
      headerTitle="用户列表"
      search={false}
      rowKey="id"
      request={getUserList}
      pagination={false}
      toolBarRender={() => [
        <UserAdd key="add" onSuccess={onReload} element={<Button type="primary">新增</Button>} />,
      ]}
      defaultSize="small"
    />
  )
}
