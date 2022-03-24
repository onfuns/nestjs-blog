import { useEffect, useState } from 'react'
import { Form, Input, message, Radio, DatePicker, Select } from 'antd'
import { inject, observer } from 'mobx-react'
import { ArticleStore, TagStore } from '@/store'
import Editor from '@/components/Editor'
import dayjs from 'dayjs'
import CategoryCascader from '@/components/Portal/Category/Cascader'
import Drawer from '@/components/UI/Drawer'

interface IProps {
  articleStore?: ArticleStore
  tagStore?: TagStore
  onCancel?: () => void
  onSuccess?: () => void
  detail?: Record<string, any>
}

const formatDate = 'YYYY-MM-DD HH:mm:ss'

const ArticleAdd = ({ articleStore, tagStore, onCancel, onSuccess, detail = {} }: IProps) => {
  const [content, setContent] = useState('')
  const [form] = Form.useForm()

  const loadData = async () => {
    await articleStore.getInfoById({ id: detail.id })
    //表单赋值
    const { detail: acticleDetail } = articleStore
    const { publish_time, category, tag_id, content } = acticleDetail
    setContent(content)
    form.setFieldsValue({
      ...acticleDetail,
      publish_time: dayjs(publish_time),
      tag_id: tag_id ? tag_id.split(',').map(id => Number(id)) : undefined,
      category_id: category?.pid === 0 ? [category.id] : [category.pid, category.id],
    })
  }

  useEffect(() => {
    tagStore.get()
    if (detail.id) loadData()
  }, [])

  const onSubmit = async () => {
    form
      .validateFields()
      .then(async values => {
        const { publish_time, category_id, tag_id = [] } = values
        const params = {
          ...values,
          publish_time: dayjs(publish_time).format(formatDate),
          category_id: category_id.pop(),
          tag_id: tag_id.join(','),
          content,
        }
        if (!content) return message.warn('请输入内容')
        let fn = articleStore.add
        if (detail.id) {
          fn = articleStore.update
          params.id = detail.id
        }
        const { success } = await fn(params)
        if (success) {
          message.success('操作成功')
          onSuccess()
        }
      })
      .catch(err => {
        form.scrollToField(err['errorFields'][0]['name'][0], { behavior: 'smooth' })
      })
  }

  const { result: tagList } = tagStore

  return (
    <Drawer title="文章信息" onClose={onCancel} onSubmit={onSubmit} visible={true}>
      <Form
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 20 }}
        form={form}
        initialValues={{
          pass_flag: 1,
          comment_flag: 1,
          publish_time: dayjs(),
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

        <Form.Item label="标签" name="tag_id">
          <Select mode="multiple" style={{ width: '100%' }} placeholder="请选择标签">
            {tagList.map((item, index) => (
              <Select.Option key={index} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="审核状态" name="pass_flag">
          <Radio.Group>
            <Radio value={1}>通过</Radio>
            <Radio value={0}>待审核</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="发布时间" name="publish_time" rules={[{ required: true }]}>
          <DatePicker showTime allowClear={false} format={formatDate} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="发布人" name="author">
          <Input placeholder="请输入发布人" />
        </Form.Item>

        <Form.Item label="内容" required>
          <Editor value={content} onChange={value => setContent(value)} />
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default inject('articleStore', 'tagStore')(observer(ArticleAdd))
