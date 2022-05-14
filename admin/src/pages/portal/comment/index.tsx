import { useRef } from 'react'
import AddModal from '@/components/Portal/Comment/Add'
import { inject, observer } from 'mobx-react'
import { CommentStore } from '@/store'
import { Button, Popconfirm, Switch, message, Space } from 'antd'
import dayjs from 'dayjs'
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table'
import { useSetState } from 'ahooks'

interface IModalProps {
  visible?: boolean
  type?: 'add' | 'edit' | undefined
  record?: Record<string, any>
}

const CommentPage = ({ commentStore }: { commentStore: CommentStore }) => {
  const actionRef = useRef<ActionType>()
  const [modalProps, setModalProps] = useSetState<IModalProps>({ visible: false })

  const onLoadData = () => {
    actionRef?.current.reload()
  }

  const onAction = async (
    type: 'add' | 'reply' | 'delete' | 'pass',
    record: Record<string, any> | undefined = {},
  ) => {
    if (type === 'add' || type === 'reply') {
      setModalProps({ visible: true, record })
    } else if (type === 'delete' || type === 'pass') {
      if (type === 'delete') {
        await commentStore.delete({ id: record?.id })
      }
      if (type === 'pass') {
        await commentStore.update({ id: record?.id, status: Number(!record.status) })
      }
      message.success('操作成功')
      onLoadData()
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
          await commentStore.get({ ...params })
          return { success: true, data: commentStore.result.data }
        }}
        toolBarRender={() => [
          <Button key="add" type="primary" onClick={() => onAction('add', {})}>
            新增
          </Button>,
        ]}
        defaultSize="small"
      />

      {modalProps.visible && (
        <AddModal
          onCancel={() => setModalProps({ visible: false })}
          onSuccess={() => {
            setModalProps({ visible: false })
            onLoadData()
          }}
          detail={modalProps.record || {}}
        />
      )}
    </>
  )
}

export default inject('commentStore')(observer(CommentPage))
