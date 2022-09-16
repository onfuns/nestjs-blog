import { useEffect } from 'react'
import { Form, Input, Button } from 'antd'

export default ({ onSumit, detail }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ ...detail })
  }, [detail])

  return (
    <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} form={form}>
      <Form.Item label="网站名称" name="website_title">
        <Input />
      </Form.Item>

      <Form.Item label="ICP备案" name="website_icp">
        <Input />
      </Form.Item>

      <Form.Item label="站长邮箱" name="website_email">
        <Input />
      </Form.Item>

      <Form.Item label="联系电话" name="website_phone">
        <Input />
      </Form.Item>

      <Form.Item label="QQ二维码" name="website_qq_image">
        <Input />
      </Form.Item>

      <Form.Item label="微信二维码" name="website_wechat_image">
        <Input />
      </Form.Item>

      <Form.Item label="统计代码" name="website_analysis_code">
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
