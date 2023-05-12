import { deleteFile, getFileList, getFileTypeList } from '@/actions/file'
import { ProTable, type ActionType, type ProColumns } from '@ant-design/pro-components'
import { Button, message, Popconfirm, Popover, Space } from 'antd'
import { useRef } from 'react'
import { FileAdd } from './components/Add'

export default function FilePage() {
  const actionRef = useRef<ActionType>()

  const onDelete = async (id) => {
    await deleteFile(id)
    message.success('操作成功')
    onReload()
  }

  const onReload = () => actionRef?.current.reload()

  const columns: ProColumns<any>[] = [
    {
      title: '原始名称',
      dataIndex: 'originalname',
      width: 150,
      ellipsis: true,
    },
    {
      title: '分组',
      dataIndex: 'fileTypeId',
      request: async () => {
        const types = await getFileTypeList()
        return types.map((d) => ({
          label: d.name,
          value: d.id,
        }))
      },
      render: (_, { filetype }) => filetype?.name,
    },
    {
      title: '链接',
      dataIndex: 'url',
      hideInSearch: true,
      width: 300,
      ellipsis: true,
    },
    {
      title: '图片',
      dataIndex: 'image',
      hideInSearch: true,
      render: (_, { url }) => (
        <Popover
          placement="left"
          title={null}
          content={<img src={`/${url}`} style={{ maxWidth: 500 }} />}
        >
          <img src={`/${url}`} width={30} />
        </Popover>
      ),
    },
    {
      title: '大小',
      dataIndex: 'size',
      hideInSearch: true,
    },
    {
      title: '上传时间',
      dataIndex: 'created_at',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 120,
      render: (_, record) => {
        return (
          <Space>
            <a target="_blank" rel="noreferrer" href={`/${record.url}`}>
              下载
            </a>
            <Popconfirm title="确定删除？" onConfirm={() => onDelete(record.id)}>
              <a className="color-red">删除</a>
            </Popconfirm>
          </Space>
        )
      },
    },
  ]

  return (
    <ProTable<any>
      actionRef={actionRef}
      columns={columns}
      headerTitle="附件列表"
      rowKey="id"
      request={async (params = {}) => {
        const { success, data } = await getFileList({ ...params })
        return { success, data: data.data, total: data.count }
      }}
      toolBarRender={() => [
        <FileAdd key="add" onSuccess={onReload} element={<Button type="primary">上传</Button>} />,
      ]}
      defaultSize="small"
    />
  )
}
