import { useState } from 'react'
import AddModal from '@/components/Portal/Tag/Add'
import { TagStore } from '@/store'
import ListTable from '@/components/ListTable'
import { inject, observer } from 'mobx-react'
import { Button, Popconfirm, message, Space } from 'antd'
interface IProps {
  tagStore: TagStore
}

const TagPage = ({ tagStore }: IProps) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [reloadKey, setReloadKey] = useState(Date.now())
  const [recordInfo, setRecordInfo] = useState({})

  const onSuccess = () => {
    setModalVisible(false)
    onReload()
  }

  const onReload = () => {
    setReloadKey(Date.now())
  }

  const onAction = async (record, type) => {
    if (type === 'edit') {
      setRecordInfo({ ...record })
      setModalVisible(true)
    } else if (type === 'delete') {
      const { success, msg = '删除失败' } = await tagStore.delete({ id: record.id })
      if (success) {
        message.success('删除成功')
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
      width: 250,
    },
    {
      title: '描述',
      dataIndex: 'description',
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

  const { result } = tagStore

  return (
    <>
      <Button type="primary" onClick={() => setModalVisible(true)}>
        新增
      </Button>

      <ListTable
        data={{ list: result }}
        page={false}
        columns={columns}
        reloadKey={reloadKey}
        onLoad={params => tagStore.get(params)}
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

export default inject('tagStore')(observer(TagPage))
