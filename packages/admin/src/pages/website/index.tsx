import { getWebsiteConfig, updateWebsiteConfig } from '@/actions/website'
import { useRequest } from 'ahooks'
import { FormInstance, message, Tabs } from 'antd'
import Seo from './components/Seo'
import Site from './components/Site'

export default function WebsitePage() {
  const { data: { data: websiteConfig = {} } = {}, refresh } = useRequest(getWebsiteConfig)

  const onSubmit = async (form: FormInstance) => {
    const values = await form.validateFields()
    const params = websiteConfig.map(({ id, name }) => {
      return {
        id,
        name,
        value: values[name],
      }
    })
    await updateWebsiteConfig(params)
    message.success('设置成功')
    refresh?.()
  }

  const detail = websiteConfig.reduce((obj, current) => {
    obj[current.name] = current.value
    return obj
  }, {})

  return (
    <div className="p-10">
      <Tabs defaultActiveKey="site" hideAdd animated={false}>
        <Tabs.TabPane tab="网站信息" key="site">
          <Site onSubmit={onSubmit} detail={detail} />
        </Tabs.TabPane>

        <Tabs.TabPane tab="SEO设置" key="seo">
          <Seo onSubmit={onSubmit} detail={detail} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}
