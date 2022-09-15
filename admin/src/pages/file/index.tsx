import { useRef } from 'react'
import AddModal from './components/Add'
import { observer } from 'mobx-react'
import { Button, Popconfirm, message, Space, Popover } from 'antd'
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table'
import { useSetState } from 'ahooks'
import { useStore } from '@/hooks'

export default observer(() => {
  const { fileStore } = useStore()
  const actionRef = useRef<ActionType>()
  const [modalProps, setModalProps] = useSetState<ICreateModalProps>({ visible: false })

  const onAction = async (
    type: 'add' | 'edit' | 'delete',
    record: ICreateModalProps['record'] = {},
  ) => {
    if (type === 'add' || type === 'edit') {
      setModalProps({ visible: true, record })
    } else if (type === 'delete') {
      await fileStore.delete(record.id)
      message.success('操作成功')
      actionRef?.current.reload()
    }
  }

  const columns: ProColumns<any>[] = [
    {
      title: '原始名称',
      dataIndex: 'originalname',
      width: 150,
      ellipsis: true,
    },
    {
      title: '分组',
      dataIndex: 'fileTypeId',
      request: async () => {
        const types = await fileStore.getFileType()
        return types.map(d => ({
          label: d.name,
          value: d.id,
        }))
      },
      render: (_, { filetype }) => filetype?.name,
    },
    {
      title: '链接',
      dataIndex: 'url',
      hideInSearch: true,
      width: 300,
      ellipsis: true,
    },
    {
      title: '图片',
      dataIndex: 'image',
      hideInSearch: true,
      render: (_, { url }) => (
        <Popover
          placement="left"
          title={null}
          content={<img src={`/${url}`} style={{ maxWidth: 500 }} />}
        >
          <img src={`/${url}`} width={30} />
        </Popover>
      ),
    },
    {
      title: '大小',
      dataIndex: 'size',
      hideInSearch: true,
    },
    {
      title: '上传时间',
      dataIndex: 'created_at',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 120,
      render: (_, record) => {
        return (
          <Space>
            <a target="_blank" href={`/${record.url}`}>
              下载
            </a>
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
        headerTitle="附件列表"
        rowKey="id"
        request={async (params = {}) => {
          const data = await fileStore.get({ ...params })
          return { success: true, data: data.data }
        }}
        toolBarRender={() => [
          <Button key="add" type="primary" onClick={() => onAction('add', undefined)}>
            上传
          </Button>,
        ]}
        pagination={{ pageSize: 20, total: fileStore.result.count }}
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
})
