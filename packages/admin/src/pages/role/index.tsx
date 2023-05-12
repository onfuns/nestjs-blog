import { deleteRole, getRoleList } from '@/actions/role'
import { ProTable, type ActionType, type ProColumns } from '@ant-design/pro-components'
import { Button, message, Popconfirm, Space } from 'antd'
import { useRef } from 'react'
import { RoleAdd } from './components/Add'

export default function RolePage() {
  const actionRef = useRef<ActionType>()

  const onDelete = async (id) => {
    await deleteRole(id)
    message.success('操作成功')
    onReload()
  }

  const onReload = () => actionRef?.current.reload()

  const columns: ProColumns<any>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      width: 250,
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 120,
      render: (_, record) => {
        return (
          <Space>
            <RoleAdd detail={record} onSuccess={onReload} element={<a>编辑</a>} />
            <Popconfirm title="确定删除？" onConfirm={() => onDelete(record.id)}>
              <a className="danger">删除</a>
            </Popconfirm>
          </Space>
        )
      },
    },
  ]

  return (
    <ProTable<any>
      actionRef={actionRef}
      columns={columns}
      headerTitle="角色列表"
      search={false}
      rowKey="id"
      request={async (params = {}) => {
        return await getRoleList({ ...params })
      }}
      pagination={false}
      toolBarRender={() => [
        <RoleAdd key="add" onSuccess={onReload} element={<Button>新增</Button>} />,
      ]}
      defaultSize="small"
    />
  )
}
