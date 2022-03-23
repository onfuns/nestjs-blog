import { useRef, useState } from 'react'
import AddModal from '@/components/Portal/Tag/Add'
import { TagStore } from '@/store'
import { inject, observer } from 'mobx-react'
import { Button, Popconfirm, message, Space } from 'antd'
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table'
interface IProps {
  tagStore: TagStore
}

interface IModalProps {
  visible?: boolean
  type?: 'add' | 'edit' | undefined
  record?: Record<string, any>
}

const TagPage = ({ tagStore }: IProps) => {
  const actionRef = useRef<ActionType>()
  const [modalProps, setModalProps] = useState<IModalProps>({ visible: false })

  const onSetModalProps = (props: IModalProps = {}) => {
    setModalProps({ ...modalProps, visible: !modalProps.visible, ...props })
  }

  const onReload = () => {
    actionRef?.current.reload()
  }

  const onAction = async (record: any = {}, type) => {
    if (type === 'add' || type === 'edit') {
      onSetModalProps({ record, visible: true })
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

  const columns: ProColumns<any>[] = [
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
      dataIndex: 'option',
      width: 200,
      render: (_, record) => {
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
          await tagStore.get({ ...params, page: current, pageSize })
          return { success: true, data: tagStore.result }
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

export default inject('tagStore')(observer(TagPage))
