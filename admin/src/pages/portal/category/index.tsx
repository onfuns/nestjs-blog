import { useState, useRef, useEffect } from 'react'
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
  const [expandKeys, setExpandKeys] = useState([])

  const onSetModalProps = (props: IModalProps = {}) => {
    setModalProps({ ...modalProps, visible: !modalProps.visible, ...props })
  }

  const onLoadData = () => {
    actionRef?.current.reload()
  }

  const onAction = async (record: any = {}, type: 'add' | 'edit' | 'delete' | 'status') => {
    if (type === 'add' || type === 'edit') {
      onSetModalProps({ record, visible: true })
    } else if (type === 'delete') {
      const { success } = await categoryStore.delete({ id: record.id })
      if (success) {
        message.success('删除成功')
        onLoadData()
      }
    } else if (type === 'status') {
      const { success } = await categoryStore.update({
        id: record.id,
        status: Number(!record.status),
      })
      if (success) {
        message.success('操作成功')
        onLoadData()
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
      title: '链接',
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
        columns={columns}
        headerTitle="栏目列表"
        form={{ autoFocusFirstInput: false }}
        search={false}
        expandable={{
          expandedRowKeys: expandKeys,
          onExpand: (expand, record) => {
            let newKeys = [...expandKeys]
            if (expand) {
              newKeys.push(record.id)
            } else {
              newKeys = newKeys.filter(key => key !== record.id)
            }
            setExpandKeys([...newKeys])
          },
        }}
        rowKey="id"
        onDataSourceChange={data => setExpandKeys(data.map(({ id }) => id))}
        request={async (params = {}) => {
          const { current = 1, pageSize = 20 } = params
          await categoryStore.get({ ...params, page: current, pageSize })

          return { success: true, data: categoryStore.result }
        }}
        pagination={false}
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
            onLoadData()
          }}
          onCancel={() => onSetModalProps({ visible: false })}
          detail={modalProps.record || {}}
        />
      )}
    </>
  )
}

export default inject('categoryStore')(observer(CategoryPage))
