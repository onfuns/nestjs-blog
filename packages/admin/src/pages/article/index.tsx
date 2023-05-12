import { deleteArticle, getArticleList, updateArticle } from '@/actions/article'
import { TIME_STRING } from '@/constants'
import { ProTable, type ActionType, type ProColumns } from '@ant-design/pro-components'
import { Button, message, Popconfirm, Space, Switch } from 'antd'
import dayjs from 'dayjs'
import { useRef } from 'react'
import { ArticleAdd } from './components/Add'

export default function ArticlePage() {
  const actionRef = useRef<ActionType>()

  const onAction = async (type: 'sort' | 'pass_flag' | 'delete' | 'pass', record: any = {}) => {
    const { id, sort = 0, pass_flag = 0 } = record
    if (type === 'delete') {
      await deleteArticle(id)
    } else if (type === 'sort') {
      // > 0 说明取消置顶
      await updateArticle(id, { sort: Number(sort) > 0 ? 0 : dayjs().valueOf() })
    } else if (type === 'pass_flag') {
      //审核
      await updateArticle(id, { pass_flag: Number(!pass_flag) })
    }
    message.success('操作成功')
    onReload()
  }

  const onReload = () => actionRef?.current.reload()

  const columns: ProColumns<any>[] = [
    {
      title: '标题',
      dataIndex: 'title',
      width: 250,
      render: (_, { id, title }) => (
        <a target="_blank" rel="noreferrer" href={`/article/${id}`}>
          {title}
        </a>
      ),
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
      render: (_, { publish_time }) => publish_time && dayjs(publish_time).format(TIME_STRING),
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
      valueType: 'option',
      width: 120,
      render: (_, record) => {
        return (
          <Space>
            <ArticleAdd detail={record} onSuccess={onReload} element={<a>编辑</a>} />
            <Popconfirm title="确定删除？" onConfirm={() => onAction('delete', record)}>
              <a className="color-red">删除</a>
            </Popconfirm>
          </Space>
        )
      },
    },
  ]

  return (
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
        <ArticleAdd
          key="add"
          onSuccess={onReload}
          element={
            <Button key="add" type="primary">
              新增
            </Button>
          }
        />,
      ]}
      scroll={{ x: '100%' }}
      defaultSize="small"
    />
  )
}
