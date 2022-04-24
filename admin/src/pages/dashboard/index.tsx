import { useEffect } from 'react'
import { Row, Col, Card, List, Space } from 'antd'
import styles from './style.less'
import { inject, observer } from 'mobx-react'
import { CommonStore } from '@/store'
import dayjs from 'dayjs'

interface ICountPanelProps {
  data: { title: string; value: number }[]
}

const CountPanel = ({ data = [] }: ICountPanelProps) => {
  return (
    <Card title="数据统计">
      <Row gutter={16}>
        {data.map(({ title, value }) => (
          <Col key={title} span={4}>
            <div className={styles.pannel}>
              <div className={styles.title}>{title}</div>
              <div className={styles.count}>{value}</div>
            </div>
          </Col>
        ))}
      </Row>
    </Card>
  )
}

const Dashboard = ({ commonStore }: { commonStore: CommonStore }) => {
  useEffect(() => {
    commonStore.getDashboardInfo()
  }, [])

  const { article, comment } = commonStore.dashboardInfo
  const countData = [
    { title: '文章总数', value: article?.count || 0 },
    { title: '评论总数', value: comment?.count || 0 },
  ]
  return (
    <div className={styles.page}>
      <CountPanel data={countData} />
      <Card title="最新评论" style={{ marginTop: 20 }}>
        <List
          itemLayout="horizontal"
          dataSource={comment?.data || []}
          renderItem={({ nickname, post, created_at, content }) => (
            <List.Item>
              <List.Item.Meta
                style={{ width: '100%' }}
                title={
                  <Space>
                    <span style={{ marginRight: 5 }}>{nickname}</span>在
                    <a target="_blank" href={`/article/${post?.id}`}>
                      {post?.title}
                    </a>
                    评论
                    <span style={{ float: 'right' }}>
                      {created_at && dayjs(created_at).format('YYYY-MM-DD HH:mm')}
                    </span>
                  </Space>
                }
                description={content}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  )
}

export default inject('commonStore')(observer(Dashboard))
