import { useRef, useState } from 'react'
import { inject, observer } from 'mobx-react'
import { ArticleStore } from '@/store'
import dayjs from 'dayjs'
import { Button, Popconfirm, Switch, message, Space } from 'antd'
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table'
import ArticleAdd from '@/components/Portal/Article/Add'

interface IProps {
  articleStore: ArticleStore
}
interface IModalProps {
  visible?: boolean
  type?: 'add' | 'edit' | undefined
  record?: Record<string, any>
}

const Article = ({ articleStore }: IProps) => {
  const actionRef = useRef<ActionType>()
  const [modalProps, setModalProps] = useState<IModalProps>({ visible: false })

  const onSetModalProps = (props: IModalProps = {}) => {
    setModalProps({ ...modalProps, visible: !modalProps.visible, ...props })
  }

  const onAction = async ({ id = '', sort = 0, pass_flag = 0 } = {}, type) => {
    let params: any = { id }
    let fn = articleStore.update
    //置顶
    if (type === 'sort') {
      // > 0 说明取消置顶
      params.sort = Number(sort) > 0 ? 0 : dayjs().unix()
    }
    //审核
    else if (type === 'pass') {
      params.pass_flag = Number(!Boolean(pass_flag))
    }
    //删除
    else if (type === 'delete' || type === 'delete_all') {
      params = {
        id: type === 'delete_all' ? [] : [id],
      }
      fn = articleStore.delete
    }

    const { success } = await fn(params)
    if (success) {
      message.success('操作成功')
      actionRef?.current.reload()
    }
  }

  const columns: ProColumns<any>[] = [
    {
      title: '标题',
      dataIndex: 'title',
      width: 250,
      render: (_, { id, title }) => {
        return (
          <a target="__blank" href={`/article/${id}`}>
            {title}
          </a>
        )
      },
    },
    {
      title: '类别',
      dataIndex: 'category',
      hideInSearch: true,
      render: (_, { category }) => category?.name,
    },
    {
      title: '标签',
      dataIndex: 'tags',
      hideInSearch: true,
      render: (_, { tags }) => tags?.map(({ name }) => name).join(','),
    },
    {
      title: '发布时间',
      hideInSearch: true,
      dataIndex: 'publish_time',
      render: (_, { publish_time }) =>
        publish_time && dayjs(publish_time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '置顶状态',
      dataIndex: 'sort',
      valueEnum: {
        1: '已通过',
        2: '未审核',
      },
      width: 100,
      render: (_, { id, sort }) => (
        <Switch checked={sort > 0} onChange={() => onAction({ id, sort }, 'sort')} size="small" />
      ),
    },
    {
      title: '审核状态',
      dataIndex: 'review',
      valueEnum: {
        1: '已置顶',
        2: '未置顶',
      },
      width: 100,
      render: (_, { id, pass_flag }) => (
        <Switch
          checked={pass_flag === 1}
          onChange={() => onAction({ id, pass_flag }, 'pass')}
          size="small"
        />
      ),
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 200,
      render: (_, record) => {
        return (
          <Space>
            <Button size="small" onClick={() => onSetModalProps({ record, visible: true })}>
              编辑
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
        headerTitle="文章列表"
        form={{ autoFocusFirstInput: false }}
        rowKey="id"
        request={async (params = {}) => {
          const { current = 1, pageSize = 20 } = params
          await articleStore.get({ ...params, page: current, pageSize })
          return { success: true, data: articleStore.result.list }
        }}
        toolBarRender={() => [
          <Button key="add" type="primary" onClick={() => onSetModalProps({ visible: true })}>
            新增
          </Button>,
        ]}
        scroll={{ x: '100%' }}
        size="small"
      />
      {modalProps.visible && (
        <ArticleAdd
          onSuccess={() => {
            onSetModalProps({ visible: false })
            actionRef?.current.reload()
          }}
          onCancel={() => onSetModalProps({ visible: false })}
          detail={modalProps.record || {}}
        />
      )}
    </>
  )
}

export default inject('articleStore', 'categoryStore')(observer(Article))
