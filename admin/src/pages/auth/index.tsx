import { useRef, useState } from 'react'
import AddModal from './components/Add'
import { Button, Popconfirm, message, Space } from 'antd'
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table'
import { getAuthList, deleteAuth } from '@/actions/auth'
import { toTree } from '@/utils'
import { cloneDeep } from 'lodash'
import { useMergeState } from '@/hooks'

export default () => {
  const actionRef = useRef<ActionType>()
  const [modalProps, setModalProps] = useMergeState<ICreateModalProps>({ visible: false })
  const [expandKeys, setExpandKeys] = useState([])

  const onAction = async (
    type: 'add' | 'edit' | 'delete',
    record: ICreateModalProps['record'] = {},
  ) => {
    if (type === 'add' || type === 'edit') {
      setModalProps({ visible: true, record })
    } else if (type === 'delete') {
      if (record?.children?.length > 0) {
        message.warn('请先删除子节点')
        return Promise.resolve()
      }
      await deleteAuth(record.id)
      message.success('操作成功')
      actionRef?.current.reload()
    }
  }

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
      dataIndex: 'option',
      valueType: 'option',
      width: 150,
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

  console.log(`expandKeys`, expandKeys)

  return (
    <>
      <ProTable<any>
        actionRef={actionRef}
        columns={columns}
        headerTitle="权限列表"
        search={false}
        expandable={{
          expandedRowKeys: expandKeys,
          onExpand: (expand, record) => {
            let newKeys = [...expandKeys]
            if (expand) {
              newKeys.push(record.id)
            } else {
              newKeys = newKeys.filter(id => id !== record.id)
            }
            setExpandKeys([...newKeys])
          },
        }}
        rowKey="id"
        onDataSourceChange={data => {
          console.log(data)
          setExpandKeys(data.map(({ id }) => id))
        }}
        request={async (params = {}) => {
          const { success, data } = await getAuthList(params)
          return { success, data: toTree(cloneDeep(data)) }
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
