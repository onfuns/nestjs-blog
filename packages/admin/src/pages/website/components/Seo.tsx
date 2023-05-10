import { Button, Form, Input } from 'antd'
import { useEffect } from 'react'

export default function SeoPage({ onSumit, detail }) {
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ ...detail })
  }, [detail])

  return (
    <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} form={form}>
      <Form.Item label="SEO标题" name="website_seo_title">
        <Input />
      </Form.Item>

      <Form.Item label="SEO关键字" name="website_seo_keywords">
        <Input />
      </Form.Item>

      <Form.Item label="SEO描述" name="website_seo_description">
        <Input.TextArea />
      </Form.Item>

      <Form.Item label=" " colon={false}>
        <Button type="primary" onClick={() => onSumit(form)}>
          保存
        </Button>
      </Form.Item>
    </Form>
  )
}
