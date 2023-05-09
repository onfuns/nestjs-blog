import { useRef } from 'react'
import dayjs from 'dayjs'
import { Button, Popconfirm, Switch, message, Space } from 'antd'
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-components'
import ArticleAdd from './components/Add'
import { useSetState } from 'ahooks'
import { getArticleList, updateArticle, deleteArticle } from '@/actions/article'

export default function ArticlePage() {
  const actionRef = useRef<ActionType>()
  const [modalProps, setModalProps] = useSetState<ICreateModalProps>({
    visible: false,
    record: undefined,
  })

  const onAction = async (
    type: 'sort' | 'pass_flag' | 'delete' | 'pass',
    record: ICreateModalProps['record'] = {},
  ) => {
    const { id = '', sort = 0, pass_flag = 0 } = record
    const params: any = {}

    if (type === 'delete') {
      await deleteArticle(id)
    } else {
      //置顶
      if (type === 'sort') {
        // > 0 说明取消置顶
        params.sort = Number(sort) > 0 ? 0 : dayjs().valueOf()
      }
      //审核
      else if (type === 'pass_flag') {
        params.pass_flag = pass_flag === 0 ? 1 : 0
      }
      await updateArticle(id, params)
    }
    message.success('操作成功')
    actionRef?.current.reload()
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
      title: '置顶',
      dataIndex: 'sort',
      valueEnum: {
        1: '是',
        0: '否',
      },
      width: 100,
      render: (_, record) => (
        <Switch checked={record.sort > 0} onChange={() => onAction('sort', record)} size="small" />
      ),
    },
    {
      title: '审核',
      dataIndex: 'pass_flag',
      valueEnum: {
        1: '已审核',
        2: '未审核',
      },
      width: 100,
      render: (_, record) => (
        <Switch
          checked={record.pass_flag === 1}
          onChange={() => onAction('pass_flag', record)}
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
            <a onClick={() => setModalProps({ visible: true, record })}>编辑</a>
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
        headerTitle="文章列表"
        form={{ autoFocusFirstInput: false }}
        rowKey="id"
        request={async (params = {}) => {
          const { success, data } = await getArticleList({ ...params })
          return { success, data: data.data, total: data.count }
        }}
        toolBarRender={() => [
          <Button
            key="add"
            type="primary"
            onClick={() => setModalProps({ visible: true, record: {} })}
          >
            新增
          </Button>,
        ]}
        scroll={{ x: '100%' }}
        defaultSize="small"
      />
      {modalProps.visible && (
        <ArticleAdd
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
