import { useEffect, useState } from 'react'
import { Form, Input, Button, message, Radio, DatePicker, Select } from 'antd'
import Breadcrumb from '@/components/Breadcrumb'
import { inject, observer } from 'mobx-react'
import { ArticleStore, TagStore } from '@/store'
import Editor from '@/components/Editor'
import { useFilter } from '@/hooks'
import dayjs from 'dayjs'
const formatDate = 'YYYY-MM-DD HH:mm:ss'
import CategoryCascader from '@/components/Portal/Category/Cascader'
import { useHistory } from 'umi'
import styles from './add.less'

interface IProps {
  articleStore: ArticleStore
  tagStore: TagStore
}

const ArticleAddPage = ({ articleStore, tagStore }: IProps) => {
  const [content, setContent] = useState('')
  const filter = useFilter()
  const [form] = Form.useForm()
  const history = useHistory()

  const loadData = async () => {
    await articleStore.getInfoById({ id: filter.id })
    onSetFormValue()
  }

  useEffect(() => {
    tagStore.get()
    filter.id && loadData()
  }, [filter.id])

  const onSetFormValue = () => {
    const { detail } = articleStore
    const { publish_time, category, tag_id, content } = detail
    setContent(content)
    form.setFieldsValue({
      ...detail,
      publish_time: dayjs(publish_time),
      tag_id: tag_id ? tag_id.split(',').map(id => Number(id)) : undefined,
      category_id: category?.pid === 0 ? [category.id] : [category.pid, category.id],
    })
  }

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
        if (filter.id) {
          fn = articleStore.update
          params.id = filter.id
        }
        const { success, msg = '操作失败' } = await fn(params)
        if (success) {
          message.success('操作成功')
          history.push('/portal/article/list')
        } else {
          message.error(msg)
        }
      })
      .catch(err => {
        form.scrollToField(err['errorFields'][0]['name'][0], { behavior: 'smooth' })
      })
  }

  const { result: tagList } = tagStore

  return (
    <div className={styles.addPage}>
      <Breadcrumb />
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
        <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
          <Input placeholder="请输入标题" />
        </Form.Item>
        <Form.Item
          label="描述"
          name="description"
          rules={[{ required: false, message: '请输入描述' }]}
        >
          <Input.TextArea placeholder="请输入描述" showCount maxLength={200} />
        </Form.Item>
        <Form.Item
          label="分类"
          name="category_id"
          rules={[{ required: true, message: '请选择分类' }]}
        >
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

        <Form.Item label="评论状态" name="comment_flag">
          <Radio.Group>
            <Radio value={1}>开放</Radio>
            <Radio value={0}>关闭</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="发布时间"
          name="publish_time"
          rules={[{ required: true, message: '请选择发布时间' }]}
        >
          <DatePicker showTime allowClear={false} format={formatDate} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="作者" name="author" rules={[{ required: false, message: '请输入作者' }]}>
          <Input placeholder="请输入作者" />
        </Form.Item>

        <Form.Item label="内容" required>
          <Editor value={content} onChange={value => setContent(value)} />
        </Form.Item>
        <div style={{ textAlign: 'center' }}>
          <Button type="primary" onClick={onSubmit} style={{ width: 200 }}>
            保存
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default inject('articleStore', 'tagStore')(observer(ArticleAddPage))
