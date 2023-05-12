import { addCategory, getCategoryList, updateCategory } from '@/actions/category'
import {
  ModalForm,
  ProForm,
  ProFormCascader,
  ProFormRadio,
  ProFormText,
} from '@ant-design/pro-components'
import { message } from 'antd'
import { useEffect } from 'react'

export const CategoryAdd = ({ element, onSuccess, onClose, detail }: IDetailModalProps) => {
  const [form] = ProForm.useForm()
  const categoryType = ProForm.useWatch('type', form)

  useEffect(() => {
    if (detail.id) {
      form.setFieldsValue({ ...detail, pid: [detail.pid] })
    }
  }, [])

  const onFinish = async () => {
    const values = await form.validateFields()
    if (detail.id) {
      await updateCategory(detail.id, values)
    } else {
      await addCategory(values)
    }
    message.success('操作成功')
    onSuccess?.()
  }

  return (
    <ModalForm
      title="分类信息"
      trigger={element}
      modalProps={{ onOk: onFinish, onCancel: onClose, destroyOnClose: true }}
      form={form}
      initialValues={{
        pid: [0],
        type: 1,
        status: 1,
      }}
    >
      <ProFormCascader
        label="所属分类"
        name="pid"
        rules={[{ required: true }]}
        placeholder="请选择分类"
        request={async () => {
          const { data } = await getCategoryList()
          return [{ id: 0, name: '一级分类' }].concat(data)
        }}
        disabled={!!detail.id}
        fieldProps={{
          fieldNames: { label: 'name', value: 'id', children: 'children' },
          changeOnSelect: true,
        }}
      />

      <ProFormText label="名称" name="name" rules={[{ required: true }]} placeholder="请输入名称" />

      <ProFormText
        label="链接"
        name="ename"
        rules={[{ required: true }]}
        placeholder="请输入链接，如 /front"
      />

      <ProFormRadio.Group
        label="类别"
        name="type"
        rules={[{ required: true }]}
        options={[
          { label: '文章列表', value: 1 },
          { label: '单页', value: 2 },
          { label: '外链', value: 3 },
        ]}
      />

      {categoryType === 3 && (
        <ProFormText
          label="外链地址"
          name="url"
          rules={[{ required: true }]}
          placeholder="请输入外链地址"
        />
      )}

      <ProFormText label="图标" name="icon" placeholder="iconfont 或 url" />

      <ProFormText label="图标颜色" name="icon_color" placeholder="只对iconfont 有效" />

      <ProFormRadio.Group
        label="显示"
        name="status"
        rules={[{ required: true }]}
        options={[
          { label: '是', value: 1 },
          { label: '否', value: 0 },
        ]}
      />
    </ModalForm>
  )
}
