import { addArticle, getArticle, updateArticle } from '@/actions/article'
import { getTagList } from '@/actions/tag'
import CategoryCascader from '@/components/Category/Cascader'
import MDEditor from '@/components/Editor/MarkdownEditor'
import { TIME_STRING } from '@/constants'
import {
  DrawerForm,
  ProForm,
  ProFormDatePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components'
import { message } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

export const ArticleAdd = ({ element, onClose, onSuccess, detail = {} }: IDetailModalProps) => {
  const [content, setContent] = useState('')
  const [form] = ProForm.useForm()

  const loadData = async () => {
    const { data: article } = await getArticle(detail.id)
    const { publish_time, category, tags, content } = article
    setContent(content)
    form.setFieldsValue({
      ...article,
      publish_time: dayjs(publish_time),
      tags: tags?.map(({ id }) => id),
      category_id: category?.pid === 0 ? [category.id] : [category.pid, category.id],
    })
  }

  useEffect(() => {
    if (detail.id) loadData()
  }, [])

  const onFinish = async () => {
    const values = await form.validateFields()
    const params = {
      ...values,
      publish_time: dayjs(values.publish_time).format(TIME_STRING),
      category_id: values.category_id.pop(),
      tags: values.tags.map((id) => ({ id })),
      content,
    }

    if (detail.id) {
      await updateArticle(detail.id, params)
    } else {
      await addArticle(params)
    }
    message.success('操作成功')
    onSuccess?.()
  }

  return (
    <DrawerForm
      title="文章信息"
      trigger={element}
      drawerProps={{ onClose: onClose, destroyOnClose: true }}
      onFinish={onFinish}
      width="50%"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      form={form}
      initialValues={{
        pass_flag: 1,
        comment_flag: 0,
        publish_time: dayjs(),
      }}
    >
      <ProFormText
        label="标题"
        name="title"
        rules={[{ required: true }]}
        placeholder="请输入标题"
      />

      <ProFormTextArea
        label="摘要"
        name="description"
        rules={[{ required: true }]}
        placeholder="请输入摘要"
        fieldProps={{ showCount: true, maxLength: 200 }}
      />

      <ProForm.Item label="分类" name="category_id" rules={[{ required: true }]}>
        <CategoryCascader root={false} />
      </ProForm.Item>

      <ProFormSelect
        label="标签"
        name="tags"
        rules={[{ required: true }]}
        placeholder="请选择标签"
        mode="multiple"
        request={async () => {
          const { data } = await getTagList()
          return data?.map((item) => ({ label: item.name, value: item.id }))
        }}
      />

      <ProFormRadio.Group
        label="审核"
        name="pass_flag"
        options={[
          { label: '通过', value: 1 },
          { label: '待审核', value: 0 },
        ]}
      />

      <ProFormRadio.Group
        label="开放评论"
        name="comment_flag"
        options={[
          { label: '是', value: 1 },
          { label: '否', value: 0 },
        ]}
      />

      <ProFormDatePicker
        label="发布时间"
        name="publish_time"
        rules={[{ required: true }]}
        dataFormat={TIME_STRING}
        fieldProps={{ showTime: true }}
        allowClear
      />

      <ProFormText
        label="作者"
        name="author"
        rules={[{ required: true }]}
        placeholder="请输入作者"
      />

      <ProForm.Item label="内容">
        <MDEditor value={content} onChange={(value) => setContent(value)} />
      </ProForm.Item>
    </DrawerForm>
  )
}
