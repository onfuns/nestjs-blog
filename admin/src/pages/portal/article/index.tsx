import { useRef } from 'react'
import { inject, observer } from 'mobx-react'
import { ArticleStore } from '@/store'
import dayjs from 'dayjs'
import { useHistory } from 'umi'
import { Button, Popconfirm, Switch, message, Space } from 'antd'
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table'

interface IProps {
  articleStore: ArticleStore
}

const Article = ({ articleStore }: IProps) => {
  const history = useHistory()
  const actionRef = useRef<ActionType>()

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

    const { success, msg = '操作失败' } = await fn(params)
    if (success) {
      message.success('操作成功')
      actionRef?.current.reload()
    } else {
      message.error(msg)
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
      width: 200,
      render: (_, { id }) => {
        return (
          <Space>
            <Button size="small" onClick={() => history.push(`/portal/article/add?id=${id}`)}>
              编辑
            </Button>

            <Popconfirm title="确定删除？" onConfirm={() => onAction({ id }, 'delete')}>
              <Button size="small" danger>
                删除
              </Button>
            </Popconfirm>
          </Space>
        )
      },
    },
  ]

  const xWidth = columns.reduce((total, current: any) => total + current?.width || 0, 0)

  return (
    <ProTable<any>
      actionRef={actionRef}
      bordered={true}
      columns={columns}
      form={{ autoFocusFirstInput: false }}
      search={{ defaultCollapsed: false }}
      rowKey="id"
      request={async (params = {}) => {
        const { current = 1, pageSize = 20 } = params
        await articleStore.get({ ...params, page: current, pageSize })

        return { success: true, data: articleStore.result.list }
      }}
      toolBarRender={() => [
        <Button
          key="add"
          type="primary"
          onClick={() => history.push({ pathname: '/portal/article/add' })}
        >
          新增
        </Button>,
      ]}
      scroll={{ x: xWidth }}
      size="small"
    />
  )
}

export default inject('articleStore', 'categoryStore')(observer(Article))
