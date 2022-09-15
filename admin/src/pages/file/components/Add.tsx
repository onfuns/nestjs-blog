import { useEffect, useState } from 'react'
import { Form, Input, message, Select, Upload, UploadProps, Divider, Space, Button } from 'antd'
import { useStore } from '@/hooks'
import Drawer from '@/components/Drawer'
import { observer } from 'mobx-react'
import { InboxOutlined, CloseCircleFilled, PlusOutlined } from '@ant-design/icons'

export default observer(({ onSuccess, onCancel }: IDetailModalProps) => {
  const { fileStore } = useStore()
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState([])
  const [typeName, setTypeName] = useState(null)

  useEffect(() => {
    fileStore.getFileType()
  }, [])

  const onFinish = async () => {
    if (!fileList.length) return message.warn('请选择图片')

    const values = await form.validateFields()
    const formData = new FormData()
    fileList.forEach(file => {
      formData.append('files', file)
    })
    formData.append('fileTypeId', values.fileTypeId || '')
    await fileStore.add(formData)
    message.success('上传成功')
    onSuccess()
  }

  const uploadFile = async (file): Promise<any> => {
    return new Promise(resolve => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        file.url = reader.result as string
        resolve(file)
      }
    })
  }

  const checkFile = file => {
    const onError = () => {
      message.warn('只能上传图片，不超过10M')
      return false
    }
    if (!file?.type?.includes('image/')) {
      return onError()
    }
    if (file.size > 10 * 1024 * 1024) {
      return onError()
    }
    return true
  }

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: true,
    beforeUpload: async file => {
      if (!checkFile(file)) return
      const newFile = await uploadFile(file)
      fileList.push(newFile)
      setFileList([...fileList])
    },
    showUploadList: false,
  }

  const addItem = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    await fileStore.addFileType({ name: typeName })
    setTypeName(null)
    fileStore.getFileType()
  }

  return (
    <Drawer title="上传附件" visible={true} width={600} onSubmit={onFinish} onClose={onCancel}>
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} form={form}>
        <Form.Item label="分组" name="fileTypeId">
          <Select
            placeholder="未分组"
            dropdownRender={menu => (
              <>
                {menu}
                <Divider style={{ margin: '8px 0' }} />
                <Space style={{ padding: '0 8px 4px' }}>
                  <Input
                    placeholder="请输入分组名称"
                    value={typeName}
                    onChange={e => setTypeName(e.target.value)}
                  />
                  <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                    新增分组
                  </Button>
                </Space>
              </>
            )}
          >
            {fileStore.filetypes?.map(({ id, name }) => (
              <Select.Option key={id}>{name}</Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="附件" extra="仅支持图片类文件上传">
          <Upload.Dragger {...uploadProps}>
            <div
              style={{
                height: 200,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">点击或拖拽图片上传</p>
            </div>
          </Upload.Dragger>
        </Form.Item>
        {fileList.length ? (
          <Form.Item label=" " colon={false}>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {fileList
                .filter(file => file.url)
                .map((file, index) => (
                  <div
                    key={file.uid}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      position: 'relative',
                      width: 100,
                      height: 100,
                      border: '1px solid #ccc',
                      marginRight: 10,
                      marginBottom: 10,
                      verticalAlign: 'center',
                    }}
                  >
                    <img src={file.url} style={{ width: '100%' }} />
                    <CloseCircleFilled
                      style={{ position: 'absolute', right: -5, top: -5, fontSize: 16, zIndex: 5 }}
                      onClick={() => {
                        fileList.splice(index, 1)
                        setFileList([...fileList])
                      }}
                    />
                  </div>
                ))}
            </div>
          </Form.Item>
        ) : null}
      </Form>
    </Drawer>
  )
})
