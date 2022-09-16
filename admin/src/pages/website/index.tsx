import { useEffect } from 'react'
import { observer } from 'mobx-react'
import { message, Tabs, FormInstance } from 'antd'
import Site from './components/Site'
import Seo from './components/Seo'
import { useStore } from '@/hooks'

export default observer(() => {
  const { websiteStore } = useStore()

  useEffect(() => {
    websiteStore.get()
  }, [])

  const onSumit = async (form: FormInstance) => {
    const values = await form.validateFields()
    const params = websiteStore.result.map(({ id, name }) => {
      return {
        id,
        name,
        value: values[name],
      }
    })
    await websiteStore.update(params)
    message.success('设置成功')
  }

  const detail = websiteStore.result.reduce((obj, current) => {
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
})
