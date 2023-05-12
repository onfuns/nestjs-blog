import { deleteAuth, getAuthList } from '@/actions/auth'
import { toTree } from '@/utils'
import { ProTable, type ActionType, type ProColumns } from '@ant-design/pro-components'
import { Button, message, Popconfirm, Space } from 'antd'
import { cloneDeep } from 'lodash'
import { useRef, useState } from 'react'
import { AuthAdd } from './components/Add'

export default function AuthPage() {
  const actionRef = useRef<ActionType>()
  const [expandKeys, setExpandKeys] = useState([])

  const onDelete = async (record) => {
    if (record?.children?.length > 0) {
      message.warning('请先删除子节点')
      return Promise.resolve()
    }
    await deleteAuth(record.id)
    message.success('操作成功')
    onRoload()
  }

  const onRoload = () => actionRef?.current.reload()

  const columns: ProColumns<any>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      render: (_, record) => (
        <span style={{ fontFamily: '"Source Sans Pro",Calibri,Candara,Arial,sans-serif' }}>
          {record.pid !== 0 ? `   ├─   ${record.name}` : record.name}
        </span>
      ),
    },
    {
      title: '操作',
      valueType: 'option',
      width: 150,
      render: (_, record) => {
        return (
          <Space>
            <AuthAdd detail={record} onSuccess={onRoload} element={<a>编辑</a>} />
            <Popconfirm title="确定删除？" onConfirm={() => onDelete(record)}>
              <a className="color-red">删除</a>
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
      headerTitle="权限列表"
      search={false}
      expandable={{
        expandedRowKeys: expandKeys,
        onExpand: (expand, { id }) => {
          let newKeys = [...expandKeys]
          if (expand) {
            newKeys.push(id)
          } else {
            newKeys = newKeys.filter((key) => key !== id)
          }
          setExpandKeys([...newKeys])
        },
      }}
      rowKey="id"
      onDataSourceChange={(data) => {
        const keys = data.map(({ id }) => id)
        setExpandKeys(keys)
      }}
      request={async () => {
        const { data } = await getAuthList()
        return { success: true, data: toTree(cloneDeep(data)) }
      }}
      pagination={false}
      toolBarRender={() => [
        <AuthAdd onSuccess={onRoload} key="add" element={<Button type="primary">新增</Button>} />,
      ]}
      defaultSize="small"
    />
  )
}
