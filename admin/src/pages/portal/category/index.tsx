import { useState } from 'react'
import { inject, observer } from 'mobx-react'
import AddModal from '@/components/Portal/Category/Add'
import { CategoryStore } from '@/store'
import ListTable from '@/components/ListTable'
import { Button, Popconfirm, message, Switch, Space } from 'antd'
interface IProps {
  categoryStore: CategoryStore
}

const CategoryPage = ({ categoryStore }: IProps) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [recordInfo, setRecordInfo] = useState({})
  const [reloadKey, setReloadKey] = useState(Date.now())

  const onReload = () => {
    setReloadKey(Date.now())
  }

  const onSuccess = () => {
    setModalVisible(false)
    onReload()
  }

  const onAction = async (record, type: 'add' | 'edit' | 'delete' | 'status') => {
    if (type === 'add' || type === 'edit') {
      setRecordInfo({ ...record })
      setModalVisible(true)
    } else if (type === 'delete') {
      const { success, msg = '删除失败' } = await categoryStore.delete({ id: record.id })
      if (success) {
        message.success('删除成功')
        onReload()
      } else {
        message.error(msg)
      }
    } else if (type === 'status') {
      const { success, msg = '操作失败' } = await categoryStore.update({
        id: record.id,
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
      title: '名称',
      dataIndex: 'name',
      width: 300,
    },
    {
      title: '路由',
      dataIndex: 'ename',
    },
    {
      title: '类别',
      dataIndex: 'type',
      render: (value, { url }) => {
        const types = { 1: '文章列表', 2: '单页', 3: `外链（${url}）` }
        return types[value]
      },
    },
    {
      title: '显示',
      dataIndex: 'status',
      render: (value, record) => (
        <Switch checked={value === 1} onChange={() => onAction(record, 'status')} />
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (value, record) => {
        return (
          <Space>
            <Button size="small" onClick={() => onAction(record, 'edit')}>
              编辑
            </Button>
            {record.pid === 0 && record?.children?.length ? null : (
              <Popconfirm title="确定删除？" onConfirm={() => onAction(record, 'delete')}>
                <Button size="small" danger>
                  删除
                </Button>
              </Popconfirm>
            )}
          </Space>
        )
      },
    },
  ]

  const { result } = categoryStore

  return (
    <>
      <Button type="primary" onClick={() => onAction({}, 'add')}>
        新增
      </Button>
      <ListTable
        data={{ list: result }}
        page={false}
        columns={columns}
        reloadKey={reloadKey}
        onLoad={params => categoryStore.get(params)}
      />

      {modalVisible ? (
        <AddModal
          onSuccess={onSuccess}
          onCancel={() => setModalVisible(false)}
          detail={recordInfo}
        />
      ) : null}
    </>
  )
}

export default inject('categoryStore')(observer(CategoryPage))
