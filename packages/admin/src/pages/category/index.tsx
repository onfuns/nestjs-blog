import { deleteCategory, getCategoryList, updateCategory } from '@/actions/category'
import { ProTable, type ActionType, type ProColumns } from '@ant-design/pro-components'
import { Button, message, Popconfirm, Space, Switch, Tag } from 'antd'
import { useRef, useState } from 'react'
import { CategoryAdd } from './components/Add'

export const CATEGORT_TYPE = {
  1: '文章列表',
  2: '单页',
  3: '外链',
}

export default function CategoryPage() {
  const actionRef = useRef<ActionType>()
  const [expandKeys, setExpandKeys] = useState([])

  const onAction = async (type: 'delete' | 'status', record) => {
    if (type === 'delete') {
      await deleteCategory(record.id)
    } else if (type === 'status') {
      await updateCategory(record.id, { status: Number(!record.status) })
    }
    message.success('操作成功')
    onReload()
  }

  const onReload = () => actionRef?.current.reload()

  const columns: ProColumns<any>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      width: 300,
    },
    {
      title: '链接',
      dataIndex: 'ename',
    },
    {
      title: '类别',
      dataIndex: 'type',
      render: (_, { type, url }) => (
        <Tag color="green">
          {CATEGORT_TYPE[type]}
          {type === 3 && `（${url}）`}
        </Tag>
      ),
    },
    {
      title: '显示',
      dataIndex: 'status',
      render: (_, record) => (
        <Switch
          checked={record.status === 1}
          onChange={() => onAction('status', record)}
          size="small"
        />
      ),
    },
    {
      title: '操作',
      dataIndex: 'option',
      width: 120,
      render: (_, record) => {
        return (
          <Space>
            <CategoryAdd detail={record} onSuccess={onReload} element={<a>编辑</a>} />
            {record.pid === 0 && record?.children?.length ? null : (
              <Popconfirm title="确定删除？" onConfirm={() => onAction('delete', record)}>
                <a className="color-red">删除</a>
              </Popconfirm>
            )}
          </Space>
        )
      },
    },
  ]

  return (
    <ProTable<any>
      actionRef={actionRef}
      columns={columns}
      headerTitle="栏目列表"
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
      onDataSourceChange={(data) => setExpandKeys(data.map(({ id }) => id))}
      request={getCategoryList}
      pagination={false}
      toolBarRender={() => [
        <CategoryAdd
          key="add"
          onSuccess={onReload}
          element={<Button type="primary">新增</Button>}
        />,
      ]}
      defaultSize="small"
    />
  )
}
