import { useState } from 'react'
import AddModal from '@/components/Portal/Comment/Add'
import ListTable from '@/components/ListTable'
import Search from '@/components/Search'
import { inject, observer } from 'mobx-react'
import { CommentStore } from '@/store'
import { Button, Popconfirm, Tooltip, Switch, message, Space } from 'antd'
import dayjs from 'dayjs'

const CommentPage = ({ commentStore }: { commentStore: CommentStore }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [reloadKey, setReloadKey] = useState(null)
  const [recordInfo, setRecordInfo] = useState({})
  const [filter, setFilter] = useState({})

  const onSuccess = () => {
    setModalVisible(false)
    onReload()
  }

  const onReload = () => {
    setReloadKey(Date.now())
  }

  const onAction = async (record: any = {}, type) => {
    if (type === 'reply') {
      setRecordInfo({ ...record })
      setModalVisible(true)
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

  const columns = [
    {
      title: '文章标题',
      dataIndex: 'name',
      render: (value, { article }) => (
        <a href={`/article/${article?.id}`} target="__blank">
          {article?.title}
        </a>
      ),
    },
    {
      title: '评论内容',
      dataIndex: 'content',
      render: value => {
        if (value.length > 20) {
          return (
            <Tooltip title={value}>
              <span>{value.substring(0, 20) + '...'}</span>
            </Tooltip>
          )
        }
        return value
      },
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
      render: value => dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '审核状态',
      dataIndex: 'status',
      render: (value, record) => (
        <Switch checked={value === 1} onChange={() => onAction(record, 'pass')} />
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (value, record) => {
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

  const { result } = commentStore

  return (
    <div>
      <Search
        onChange={values => setFilter(values)}
        data={[
          {
            type: 'search',
            key: 'title',
            placeholder: '请输入文章标题',
            enterButton: true,
          },
        ]}
      />
      <ListTable
        data={result}
        columns={columns}
        reloadKey={reloadKey}
        onLoad={params => commentStore.get(params)}
        searchFilter={filter}
      />
      {modalVisible ? (
        <AddModal
          onSuccess={onSuccess}
          onCancel={() => setModalVisible(false)}
          detail={recordInfo}
        />
      ) : null}
    </div>
  )
}

export default inject('commentStore')(observer(CommentPage))
