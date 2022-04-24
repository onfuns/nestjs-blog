import { useState, useRef } from 'react'
import { Button, Popconfirm, Space, message, Tag } from 'antd'
import AddModal from '@/components/Setting/User/Add'
import { inject, observer } from 'mobx-react'
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table'
import { UserStore } from '@/store'
import dayjs from 'dayjs'

interface IModalProps {
  visible?: boolean
  type?: 'add' | 'edit' | undefined
  record?: Record<string, any>
}

const fromatDate = date => date && dayjs(date).format('YYYY-MM-DD HH:mm')

const UserList = ({ userStore }: { userStore?: UserStore }) => {
  const actionRef = useRef<ActionType>()
  const [modalProps, setModalProps] = useState<IModalProps>({ visible: false })

  const onSetModalProps = (props: IModalProps = {}) => {
    setModalProps({ ...modalProps, visible: !modalProps.visible, ...props })
  }

  const onLoadData = () => {
    actionRef?.current.reload()
  }

  const onAction = async (record: any = {}, type: 'add' | 'edit' | 'delete') => {
    if (type === 'add' || type === 'edit') {
      onSetModalProps({ record, visible: true })
    } else if (type === 'delete') {
      const { success } = await userStore.delete({ id: record.id })
      if (success) {
        message.success('删除成功')
        onLoadData()
      }
    }
  }

  const columns: ProColumns<any>[] = [
    {
      title: '用户名',
      dataIndex: 'name',
      ellipsis: true,
      width: 150,
    },
    {
      title: '所属角色',
      dataIndex: 'roles',
      render: (_, record) => {
        return record?.roles?.map(r => (
          <Tag key={r.id} color="blue">
            {r.name}
          </Tag>
        ))
      },
    },
    {
      title: '最后登录IP',
      dataIndex: 'last_login_ip',
      render: (_, { last_login_ip }) => last_login_ip && last_login_ip.replace('::ffff:', ''),
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      render: (_, { created_at }) => fromatDate(created_at),
    },
    {
      title: '最后登录时间',
      dataIndex: 'last_login_at',
      render: (_, { last_login_at }) => fromatDate(last_login_at),
    },
    {
      title: '状态',
      dataIndex: 'enable',
      hideInSearch: true,
      render: value => (
        <Tag color={value === 1 ? 'success' : 'error'}>{value === 1 ? '正常' : '停用'}</Tag>
      ),
      width: 80,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 130,
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
        headerTitle="用户列表"
        form={{ autoFocusFirstInput: false }}
        search={false}
        rowKey="id"
        request={async (params = {}) => {
          await userStore.get({ ...params })
          return { success: true, data: userStore.result }
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
          detail={modalProps.record}
        />
      )}
    </>
  )
}

export default inject('userStore', 'roleStore')(observer(UserList))
