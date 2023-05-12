import { addFile, addFileType, getFileTypeList } from '@/actions/file'
import { CloseCircleFilled, InboxOutlined, PlusOutlined } from '@ant-design/icons'
import {
  DrawerForm,
  ProForm,
  ProFormSelect,
  ProFormUploadDragger,
} from '@ant-design/pro-components'
import { useRequest } from 'ahooks'
import { Button, Divider, Input, message, Space, UploadProps } from 'antd'
import { useState } from 'react'

export const FileAdd = ({ element, onSuccess, onClose }: IDetailModalProps) => {
  const [form] = ProForm.useForm()
  const [fileList, setFileList] = useState([])
  const [typeName, setTypeName] = useState(null)
  const { data: { data: fileTypeList = [] } = {}, refresh: refreshFileTypeList } =
    useRequest(getFileTypeList)

  const onFinish = async () => {
    if (!fileList.length) {
      return message.warning('请选择图片')
    }

    const values = await form.validateFields()
    const formData = new FormData()
    fileList.forEach((file) => {
      formData.append('files', file)
    })
    formData.append('fileTypeId', values.fileTypeId)
    await addFile(formData)
    message.success('上传成功')
    onSuccess()
  }

  const uploadFile = async (file): Promise<any> =>
    new Promise((resolve) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        file.url = reader.result as string
        resolve(file)
      }
    })

  const checkFile = (file) => {
    const error = () => {
      message.error('只能上传图片，不超过10M')
      return false
    }
    if (!file?.type?.includes('image/')) {
      return error()
    }
    if (file.size > 10 * 1024 * 1024) {
      return error()
    }
    return true
  }

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: true,
    beforeUpload: async (file) => {
      if (!checkFile(file)) return false
      const newFile = await uploadFile(file)
      fileList.push(newFile)
      setFileList([...fileList])
    },
    showUploadList: false,
  }

  const addItem = async () => {
    await addFileType({ name: typeName })
    setTypeName(null)
    refreshFileTypeList()
  }

  return (
    <DrawerForm
      title="上传附件"
      trigger={element}
      drawerProps={{ onClose: onClose, destroyOnClose: true }}
      onFinish={onFinish}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      form={form}
    >
      <ProFormSelect
        label="分组"
        name="fileTypeId"
        placeholder="未分组"
        options={fileTypeList}
        fieldProps={{
          dropdownRender: (menu) => (
            <>
              {menu}
              <Divider className="my-8" />
              <Space className="px-8 pb-8">
                <Input
                  placeholder="请输入分组名称"
                  value={typeName}
                  onChange={(e) => setTypeName(e.target.value)}
                />
                <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                  新增分组
                </Button>
              </Space>
            </>
          ),
        }}
      />

      <ProFormUploadDragger label="附件" extra="仅支持图片类文件上传" {...uploadProps}>
        <div className="flex-center flex-col w-200">
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">点击或拖拽图片上传</p>
        </div>
      </ProFormUploadDragger>

      {fileList.length ? (
        <ProForm.Item label=" " colon={false}>
          <div className="flex flex-wrap">
            {fileList
              .filter((file) => file.url)
              .map((file, index) => (
                <div
                  key={file.uid}
                  className="flex items-center relative w-100 h-100 border border-solid border-#ccc mr-10 mb-10 v-mid"
                >
                  <img src={file.url} style={{ width: '100%' }} />
                  <CloseCircleFilled
                    className="absolute z-5 right-[-5] top-[-5] text-size-16 "
                    onClick={() => {
                      fileList.splice(index, 1)
                      setFileList([...fileList])
                    }}
                  />
                </div>
              ))}
          </div>
        </ProForm.Item>
      ) : null}
    </DrawerForm>
  )
}
