import { useRef, useState } from 'react'
import AddRoleModal from '@/components/Setting/Role/Add'
import AuthTreeModal from '@/components/Setting/Role/AuthTree'
import { RoleStore } from '@/store'
import { inject, observer } from 'mobx-react'
import { Button, Popconfirm, message, Space, Tag } from 'antd'
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table'
interface IProps {
  roleStore: RoleStore
}

interface IModalProps {
  visible?: boolean
  type?: 'add' | 'edit' | undefined
  record?: Record<string, any>
  modalType?: 'authTree' | 'role'
}

const RolePage = ({ roleStore }: IProps) => {
  const actionRef = useRef<ActionType>()
  const [modalProps, setModalProps] = useState<IModalProps>({ visible: false })

  const onSetModalProps = (props: IModalProps = {}) => {
    setModalProps({ ...modalProps, visible: !modalProps.visible, modalType: 'role', ...props })
  }

  const onLoadData = () => {
    actionRef?.current.reload()
  }

  const onAction = async (record: any = {}, type) => {
    if (type === 'add' || type === 'edit') {
      onSetModalProps({ record, visible: true })
    } else if (type === 'delete') {
      const { success } = await roleStore.delete({ id: record.id })
      if (success) {
        message.success('删除成功')
        onLoadData()
      }
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
      width: 200,
      render: (_, record) => {
        return (
          <Space>
            <Button size="small" type="ghost" onClick={() => onAction(record, 'edit')}>
              编辑
            </Button>
            <Button
              size="small"
              onClick={() => onSetModalProps({ visible: true, modalType: 'authTree', record })}
            >
              权限设置
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

  const CustomComp = modalProps.modalType === 'authTree' ? AuthTreeModal : AddRoleModal

  return (
    <>
      <ProTable<any>
        actionRef={actionRef}
        columns={columns}
        headerTitle="角色列表"
        form={{ autoFocusFirstInput: false }}
        search={false}
        rowKey="id"
        request={async (params = {}) => {
          await roleStore.get({ ...params })
          return { success: true, data: roleStore.result }
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
        <CustomComp
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

export default inject('roleStore')(observer(RolePage))
