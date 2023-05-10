import { deleteCategory, getCategoryList, updateCategory } from '@/actions/category'
import { CATEGORT_TYPE } from '@/constants'
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-components'
import { useSetState } from 'ahooks'
import { Button, message, Popconfirm, Space, Switch, Tag } from 'antd'
import { useRef, useState } from 'react'
import AddModal from './components/Add'

export default function CategoryPage() {
  const actionRef = useRef<ActionType>()
  const [modalProps, setModalProps] = useSetState<ICreateModalProps>({ visible: false })
  const [expandKeys, setExpandKeys] = useState([])

  const onAction = async (
    type: 'add' | 'edit' | 'delete' | 'status',
    record: ICreateModalProps['record'] = {},
  ) => {
    if (type === 'add' || type === 'edit') {
      setModalProps({ visible: true, type, record })
    } else if (type === 'delete' || type === 'status') {
      if (type === 'delete') {
        await deleteCategory(record.id)
      }
      if (type === 'status') {
        await updateCategory(record.id, {
          status: Number(!record.status),
        })
      }
      message.success('操作成功')
      actionRef?.current.reload()
    }
  }

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
          {type === 3 ? `（${url}）` : ''}
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
        headerTitle="栏目列表"
        search={false}
        expandable={{
          expandedRowKeys: expandKeys,
          onExpand: (expand, record) => {
            let newKeys = [...expandKeys]
            if (expand) {
              newKeys.push(record.id)
            } else {
              newKeys = newKeys.filter((key) => key !== record.id)
            }
            setExpandKeys([...newKeys])
          },
        }}
        rowKey="id"
        onDataSourceChange={(data) => setExpandKeys(data.map(({ id }) => id))}
        request={async () => {
          return await getCategoryList()
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
          detail={modalProps.record || {}}
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