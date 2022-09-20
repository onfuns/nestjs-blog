import { message, Tabs, FormInstance } from 'antd'
import Site from './components/Site'
import Seo from './components/Seo'
import { useFetch } from '@/hooks'
import { getWebsiteConfig, updateWebsiteConfig } from '@/actions/website'

export default function WebsitePage() {
  const [{ data = [] } = {}, reloadData] = useFetch(getWebsiteConfig)

  const onSumit = async (form: FormInstance) => {
    const values = await form.validateFields()
    const params = data.map(({ id, name }) => {
      return {
        id,
        name,
        value: values[name],
      }
    })
    await updateWebsiteConfig(params)
    message.success('设置成功')
    reloadData?.()
  }

  const detail = data.reduce((obj, current) => {
    obj[current.name] = current.value
    return obj
  }, {})

  return (
    <div style={{ padding: 10 }}>
      <Tabs defaultActiveKey="site" hideAdd animated={false}>
        <Tabs.TabPane tab="网站信息" key="site">
          <Site onSumit={onSumit} detail={detail} />
        </Tabs.TabPane>

        <Tabs.TabPane tab="SEO设置" key="seo">
          <Seo onSumit={onSumit} detail={detail} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}
