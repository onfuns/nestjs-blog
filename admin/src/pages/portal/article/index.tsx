import { useRef } from 'react'
import { inject, observer } from 'mobx-react'
import { ArticleStore } from '@/store'
import dayjs from 'dayjs'
import { Button, Popconfirm, Switch, message, Space } from 'antd'
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table'
import ArticleAdd from '@/components/Portal/Article/Add'
import { useSetState } from 'ahooks'

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
  const [modalProps, setModalProps] = useSetState<IModalProps>({ visible: false })

  const onAction = async (
    type: 'sort' | 'pass_flag' | 'delete' | 'pass',
    record: Record<string, any> | undefined = {},
  ) => {
    const { id = '', sort = 0, pass_flag = 0 } = record
    let params: any = { id }
    let fn = articleStore.update
    //置顶
    if (type === 'sort') {
      // > 0 说明取消置顶
      params.sort = Number(sort) > 0 ? 0 : dayjs().unix()
    }
    //审核
    else if (type === 'pass_flag') {
      params.pass_flag = Number(!Boolean(pass_flag))
    }
    //删除
    else if (type === 'delete') {
      fn = articleStore.delete
    }

    await fn(params)
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
        '-1': '否',
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
          await articleStore.get({ ...params })
          return { success: true, data: articleStore.result.data }
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

export default inject('articleStore', 'categoryStore')(observer(Article))
