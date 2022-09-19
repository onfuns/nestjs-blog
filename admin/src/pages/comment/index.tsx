import { useRef } from 'react'
import AddModal from './components/Add'
import { Popconfirm, Switch, message, Space } from 'antd'
import dayjs from 'dayjs'
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table'
import { useMergeState } from '@/hooks'
import { getCommentList, deleteComment, updateComment } from '@/actions/comment'

export default () => {
  const actionRef = useRef<ActionType>()
  const [modalProps, setModalProps] = useMergeState<ICreateModalProps>({
    visible: false,
    record: undefined,
  })

  const onAction = async (
    type: 'add' | 'reply' | 'delete' | 'pass',
    record: ICreateModalProps['record'] = {},
  ) => {
    if (type === 'add' || type === 'reply') {
      setModalProps({ visible: true, record })
    } else if (type === 'delete' || type === 'pass') {
      if (type === 'delete') {
        await deleteComment(record.id)
      }
      if (type === 'pass') {
        await updateComment(record.id, { status: Number(!record.status) })
      }
      message.success('操作成功')
      actionRef?.current.reload()
    }
  }

  const columns: ProColumns<any>[] = [
    {
      title: '文章标题',
      dataIndex: 'title',
      width: 250,
      ellipsis: true,
      render: (_, { article }) => (
        <a href={`/article/${article?.id}`} target="__blank">
          {article?.title}
        </a>
      ),
    },
    {
      title: '评论内容',
      dataIndex: 'content',
      hideInSearch: true,
      ellipsis: true,
      width: 120,
    },
    {
      title: '评论人',
      dataIndex: 'name',
      hideInSearch: true,
    },
    {
      title: '站点',
      dataIndex: 'url',
      hideInSearch: true,
    },
    {
      title: '回复内容',
      dataIndex: 'reply',
      hideInSearch: true,
    },
    {
      title: '评论时间',
      dataIndex: 'created_at',
      hideInSearch: true,
      render: (_, { created_at }) => created_at && dayjs(created_at).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: '审核',
      dataIndex: 'status',
      hideInSearch: true,
      width: 100,
      render: (_, record) => (
        <Switch
          checked={record.status === 1}
          onChange={() => onAction('pass', record)}
          size="small"
        />
      ),
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 120,
      render: (_, record) => {
        return (
          <Space>
            <a onClick={() => onAction('reply', record)}>回复</a>
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
        headerTitle="评论列表"
        form={{ autoFocusFirstInput: false }}
        rowKey="id"
        request={async (params = {}) => {
          const { data, success } = await getCommentList({ ...params })
          return { success, data: data?.data || [], total: data.count }
        }}
        defaultSize="small"
      />

      {modalProps.visible && (
        <AddModal
          onCancel={() => setModalProps({ visible: false })}
          onSuccess={() => {
            setModalProps({ visible: false })
            actionRef?.current.reload()
          }}
          detail={modalProps.record || {}}
        />
      )}
    </>
  )
}
