import { useRef } from 'react'
import AddModal from './components/Add'
import { Button, Popconfirm, message, Space } from 'antd'
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table'
import { useMergeState } from '@/hooks'
import { getRoleList, deleteRole } from '@/actions/role'

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
      await deleteRole(record.id)
      message.success('操作成功')
      actionRef?.current.reload()
    }
  }

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
      dataIndex: 'option',
      valueType: 'option',
      width: 120,
      render: (_, record) => {
        return (
          <Space>
            <a onClick={() => onAction('edit', record)}>编辑</a>
            <Popconfirm title="确定删除？" onConfirm={() => onAction('delete', record)}>
              <a className="danger">删除</a>
            </Popconfirm>
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
        headerTitle="角色列表"
        search={false}
        rowKey="id"
        request={async (params = {}) => {
          return await getRoleList({ ...params })
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
