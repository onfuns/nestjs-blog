import { useRef, useState } from 'react'
import AddModal from '@/components/Portal/Comment/Add'
import { inject, observer } from 'mobx-react'
import { CommentStore } from '@/store'
import { Button, Popconfirm, Switch, message, Space } from 'antd'
import dayjs from 'dayjs'
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table'

interface IModalProps {
  visible?: boolean
  type?: 'add' | 'edit' | undefined
  record?: Record<string, any>
}

const CommentPage = ({ commentStore }: { commentStore: CommentStore }) => {
  const actionRef = useRef<ActionType>()
  const [modalProps, setModalProps] = useState<IModalProps>({ visible: false })

  const onSetModalProps = (props: IModalProps = {}) => {
    setModalProps({ ...modalProps, visible: !modalProps.visible, ...props })
  }

  const onLoadData = () => {
    actionRef?.current.reload()
  }

  const onAction = async (record: any = {}, type) => {
    if (type === 'reply') {
      onSetModalProps({ record, visible: true })
    } else if (type === 'delete') {
      const { success } = await commentStore.delete({ id: record?.id })
      if (success) {
        message.success('删除成功')
        onLoadData()
      }
    } else if (type === 'pass') {
      const { success } = await commentStore.update({
        id: record?.id,
        status: Number(!record.status),
      })
      if (success) {
        message.success('操作成功')
        onLoadData()
      }
    }
  }

  const columns: ProColumns<any>[] = [
    {
      title: '文章标题',
      dataIndex: 'name',
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
      ellipsis: true,
      width: 120,
    },
    {
      title: '评论人',
      dataIndex: 'name',
    },
    {
      title: '站点',
      dataIndex: 'url',
    },
    {
      title: '回复内容',
      dataIndex: 'reply',
    },
    {
      title: '评论时间',
      dataIndex: 'created_at',
      render: (_, { created_at }) => created_at && dayjs(created_at).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: '审核状态',
      dataIndex: 'status',
      width: 100,
      render: (_, record) => (
        <Switch
          checked={record.status === 1}
          onChange={() => onAction(record, 'pass')}
          size="small"
        />
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => {
        return (
          <Space>
            <Button size="small" onClick={() => onAction(record, 'reply')}>
              回复
            </Button>
            <Popconfirm title="确定删除？" onConfirm={() => onAction(record, 'delete')}>
              <Button size="small" danger>
                删除
              </Button>
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
        search={false}
        rowKey="id"
        request={async (params = {}) => {
          const { current = 1, pageSize = 20 } = params
          await commentStore.get({ ...params, page: current, pageSize })
          return { success: true, data: commentStore.result.list }
        }}
        toolBarRender={() => [
          <Button key="add" type="primary" onClick={() => onAction({}, 'add')}>
            新增
          </Button>,
        ]}
        size="small"
      />

      {modalProps.visible && (
        <AddModal
          onSuccess={() => {
            onSetModalProps({ visible: false })
            onLoadData()
          }}
          onCancel={() => onSetModalProps({ visible: false })}
          detail={modalProps.record || {}}
        />
      )}
    </>
  )
}

export default inject('commentStore')(observer(CommentPage))
