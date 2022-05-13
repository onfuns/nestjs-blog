import { useRef } from 'react'
import AddModal from '@/components/Portal/Tag/Add'
import { TagStore } from '@/store'
import { inject, observer } from 'mobx-react'
import { Button, Popconfirm, message, Space } from 'antd'
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table'
import { useSetState } from 'ahooks'
interface IProps {
  tagStore: TagStore
}

interface IModalProps {
  visible?: boolean
  type?: 'add' | 'edit' | undefined
  record?: Record<string, any>
}

const TagPage = ({ tagStore }: IProps) => {
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
      await tagStore.delete({ id: record.id })
      message.success('操作成功')
      onLoadData()
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
      width: 200,
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
        headerTitle="标签列表"
        form={{ autoFocusFirstInput: false }}
        search={false}
        rowKey="id"
        request={async (params = {}) => {
          await tagStore.get({ ...params })
          return { success: true, data: tagStore.result }
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
            onLoadData()
          }}
          onCancel={() => setModalProps({ visible: false })}
        />
      )}
    </>
  )
}

export default inject('tagStore')(observer(TagPage))
