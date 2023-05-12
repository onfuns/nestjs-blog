import { ProForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components'
import { Button } from 'antd'
import { useEffect } from 'react'
import { ITabProps } from '../interface'

export default function SeoPage({ onSubmit, detail }: ITabProps) {
  const [form] = ProForm.useForm()

  useEffect(() => {
    form.setFieldsValue({ ...detail })
  }, [detail])

  return (
    <ProForm labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} form={form}>
      <ProFormText
        label="SEO 标题"
        name="website_seo_title"
        rules={[{ required: true }]}
        placeholder="请输入 SEO 标题"
      />

      <ProFormText
        label="SEO 关键字"
        name="website_seo_keywords"
        rules={[{ required: true }]}
        placeholder="请输入 SEO 关键字"
      />

      <ProFormTextArea
        label="SEO 描述"
        name="website_seo_description"
        placeholder="请输入 SEO 描述"
        fieldProps={{ showCount: true, maxLength: 200 }}
      />

      <ProForm.Item label=" " colon={false}>
        <Button type="primary" onClick={() => onSubmit(form)}>
          保存
        </Button>
      </ProForm.Item>
    </ProForm>
  )
}
