import { useState, useRef } from 'react'
import { inject, observer } from 'mobx-react'
import AddModal from '@/components/Portal/Category/Add'
import { CategoryStore } from '@/store'
import { Button, Popconfirm, message, Switch, Space } from 'antd'
import { CATEGORT_TYPE } from '@/constants'
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table'

interface IProps {
  categoryStore: CategoryStore
}

interface IModalProps {
  visible?: boolean
  type?: 'add' | 'edit' | undefined
  record?: Record<string, any>
}

const CategoryPage = ({ categoryStore }: IProps) => {
  const actionRef = useRef<ActionType>()
  const [modalProps, setModalProps] = useState<IModalProps>({ visible: false })

  const onSetModalProps = (props: IModalProps = {}) => {
    setModalProps({ ...modalProps, visible: !modalProps.visible, ...props })
  }

  const onReload = () => {
    actionRef?.current.reload()
  }

  const onAction = async (record: any = {}, type: 'add' | 'edit' | 'delete' | 'status') => {
    if (type === 'add' || type === 'edit') {
      onSetModalProps({ record, visible: true })
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
    }
  }

  const columns: ProColumns<any>[] = [
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
      render: (_, { type, url }) => CATEGORT_TYPE[type] + (type === 3 ? `（${url}）` : ''),
    },
    {
      title: '显示',
      dataIndex: 'status',
      render: (_, record) => (
        <Switch
          checked={record.status === 1}
          onChange={() => onAction(record, 'status')}
          size="small"
        />
      ),
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
          await categoryStore.get({ ...params, page: current, pageSize })

          return { success: true, data: categoryStore.result }
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

export default inject('categoryStore')(observer(CategoryPage))
