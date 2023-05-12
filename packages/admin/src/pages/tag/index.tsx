import { deleteTag, getTagList } from '@/actions/tag'
import { ProTable, type ActionType, type ProColumns } from '@ant-design/pro-components'
import { Button, message, Popconfirm, Space } from 'antd'
import { useRef } from 'react'
import { TagAdd } from './components/Add'

export default function TagPage() {
  const actionRef = useRef<ActionType>()

  const onDelete = async (id) => {
    await deleteTag(id)
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
            <TagAdd detail={record} onSuccess={onReload} element={<a>编辑</a>} />,
            <Popconfirm title="确定删除？" onConfirm={() => onDelete(record.id)}>
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
      headerTitle="标签列表"
      search={false}
      rowKey="id"
      request={async (params = {}) => {
        return getTagList({ ...params })
      }}
      pagination={false}
      toolBarRender={() => [
        <TagAdd key="add" onSuccess={onReload} element={<Button>新增</Button>} />,
      ]}
      defaultSize="small"
    />
  )
}
