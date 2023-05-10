import { addArticle, getArticle, updateArticle } from '@/actions/article'
import { getTagList } from '@/actions/tag'
import CategoryCascader from '@/components/CategoryCascader'
import Drawer from '@/components/Drawer'
import MDEditor from '@/components/Editor/MDEditor'
import { useFetch } from '@/hooks'
import { DatePicker, Form, Input, message, Radio, Select } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
const timeFormat = 'YYYY-MM-DD HH:mm:ss'

export default function ArticleAdd({ onCancel, onSuccess, detail = {} }: IDetailModalProps) {
  const [{ data: tagList = [] }] = useFetch(getTagList)
  const [content, setContent] = useState('')
  const [form] = Form.useForm()

  const loadData = async () => {
    const { data: acticleDetail } = await getArticle(detail.id)
    const { publish_time, category, tags, content } = acticleDetail
    setContent(content)
    form.setFieldsValue({
      ...acticleDetail,
      publish_time: dayjs(publish_time),
      tags: tags?.map(({ id }) => id),
      category_id: category?.pid === 0 ? [category.id] : [category.pid, category.id],
    })
  }

  useEffect(() => {
    if (detail.id) loadData()
  }, [])

  const onSubmit = async () => {
    form.validateFields().then(async (values) => {
      const { publish_time, category_id, tags = [] } = values
      const params = {
        ...values,
        publish_time: dayjs(publish_time).format(timeFormat),
        category_id: category_id.pop(),
        tags: tags.map((id) => ({ id })),
        content,
      }
      if (!content) return message.warn('请输入内容')
      if (detail.id) {
        await updateArticle(detail.id, params)
      } else {
        await addArticle(params)
      }
      message.success('操作成功')
      onSuccess()
    })
  }

  return (
    <Drawer title="文章信息" onClose={onCancel} onSubmit={onSubmit} visible={true}>
      <Form
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 20 }}
        form={form}
        initialValues={{
          pass_flag: 1,
          comment_flag: 0,
          publish_time: dayjs(),
          author: 'onfuns',
        }}
      >
        <Form.Item label="标题" name="title" rules={[{ required: true }]}>
          <Input placeholder="请输入标题" />
        </Form.Item>

        <Form.Item label="描述" name="description">
          <Input.TextArea placeholder="请输入描述" showCount maxLength={200} />
        </Form.Item>

        <Form.Item label="分类" name="category_id" rules={[{ required: true }]}>
          <CategoryCascader root={false} />
        </Form.Item>

        <Form.Item label="标签" name="tags">
          <Select mode="multiple" style={{ width: '100%' }} placeholder="请选择标签">
            {tagList.map((item, index) => (
              <Select.Option key={index} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="审核" name="pass_flag">
          <Radio.Group>
            <Radio value={1}>通过</Radio>
            <Radio value={0}>待审核</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="开放评论" name="comment_flag">
          <Radio.Group>
            <Radio value={1}>是</Radio>
            <Radio value={0}>否</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="发布时间" name="publish_time" rules={[{ required: true }]}>
          <DatePicker showTime allowClear={false} format={timeFormat} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="发布人" name="author" rules={[{ required: true }]}>
          <Input placeholder="请输入发布人" />
        </Form.Item>

        <Form.Item label="内容" required>
          <MDEditor value={content} onChange={(value) => setContent(value)} />
        </Form.Item>
      </Form>
    </Drawer>
  )
}
