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

  const onReload = () => {
    actionRef?.current.reload()
  }

  const onAction = async (record: any = {}, type) => {
    if (type === 'reply') {
      onSetModalProps({ record, visible: true })
    } else if (type === 'delete') {
      const { success, msg = '删除失败' } = await commentStore.delete({ id: record?.id })
      if (success) {
        message.success('删除成功')
        onReload()
      } else {
        message.error(msg)
      }
    } else if (type === 'pass') {
      const { success, msg = '操作失败' } = await commentStore.update({
        id: record?.id,
        status: Number(!record.status),
      })
      if (success) {
        message.success('操作成功')
        onReload()
      } else {
        message.error(msg)
      }
    } else {
      console.log('do nothing')
    }
  }

  const columns: ProColumns<any>[] = [
    {
      title: '文章标题',
      dataIndex: 'name',
      width: 250,
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
      render: (_, { created_at }) => created_at && dayjs(created_at).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '审核状态',
      dataIndex: 'status',
      render: (_, record) => (
        <Switch checked={record.status === 1} onChange={() => onAction(record, 'pass')} />
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
        bordered={true}
        columns={columns}
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
            onReload()
          }}
          onCancel={() => onSetModalProps({ visible: false })}
          detail={modalProps.record || {}}
        />
      )}
    </>
  )
}

export default inject('commentStore')(observer(CommentPage))
