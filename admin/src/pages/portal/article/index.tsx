import { useState } from 'react'
import { inject, observer } from 'mobx-react'
import ListTable from '@/components/ListTable'
import { ArticleStore } from '@/store'
import dayjs from 'dayjs'
import { useHistory } from 'umi'
import Search from '@/components/Search'
import { Button, Popconfirm, Switch, message } from 'antd'
import { Link } from 'umi'
import styles from './index.less'
interface IProps {
  articleStore: ArticleStore
}

const Article = ({ articleStore }: IProps) => {
  const history = useHistory()
  const [reloadKey, setReloadKey] = useState(null)
  const [filter, setFilter] = useState({})

  const onReload = () => {
    setReloadKey(Date.now())
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

    const { success, msg = '操作失败' } = await fn(params)
    if (success) {
      message.success('操作成功')
      onReload()
    } else {
      message.error(msg)
    }
  }

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      width: 250,
      render: (value, { id }) => {
        return (
          <a target="__blank" href={`/article/${id}`}>
            {value}
          </a>
        )
      },
    },
    {
      title: '类别',
      dataIndex: 'category',
      render: value => value?.name,
    },
    {
      title: '标签',
      dataIndex: 'tags',
      render: value => value?.map(({ name }) => name).join(','),
    },
    {
      title: '发布时间',
      dataIndex: 'publish_time',
      render: value => dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '置顶',
      dataIndex: 'sort',
      width: 100,
      render: (value, { id, sort }) => (
        <Switch checked={sort > 0} onChange={() => onAction({ id, sort }, 'sort')} />
      ),
    },
    {
      title: '审核',
      dataIndex: 'review',
      width: 100,
      render: (value, { id, pass_flag }) => (
        <Switch checked={pass_flag === 1} onChange={() => onAction({ id, pass_flag }, 'pass')} />
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (value, { id }) => {
        return (
          <div>
            <Link to={{ pathname: '/portal/article/add', search: `?id=${id}` }}>
              <Button size="small">编辑</Button>
            </Link>

            <Popconfirm title="确定删除？" onConfirm={() => onAction({ id }, 'delete')}>
              <Button size="small" danger style={{ marginLeft: 10 }}>
                删除
              </Button>
            </Popconfirm>
          </div>
        )
      },
    },
  ]

  const { result } = articleStore

  return (
    <div>
      <Search
        onChange={values => setFilter(values)}
        data={[
          {
            type: 'search',
            key: 'title',
            placeholder: '请输入标题',
            enterButton: true,
          },
          {
            type: 'select',
            key: 'pass_flag',
            placeholder: '审核状态',
            options: [
              { label: '已通过', value: 1 },
              { label: '未审核', value: 0 },
            ],
            allowClear: true,
          },
          {
            type: 'select',
            key: 'sort',
            placeholder: '置顶状态',
            options: [
              { label: '已置顶', value: 1 },
              { label: '未置顶', value: 0 },
            ],
            allowClear: true,
          },
        ]}
      />
      <div className={styles.btnGroup}>
        <Button
          type="primary"
          size="small"
          onClick={() => history.push({ pathname: '/portal/article/add' })}
        >
          新增
        </Button>
      </div>

      <ListTable
        data={result}
        searchFilter={filter}
        columns={columns}
        reloadKey={reloadKey}
        onLoad={params => articleStore.get(params)}
      />
    </div>
  )
}

export default inject('articleStore', 'categoryStore')(observer(Article))
