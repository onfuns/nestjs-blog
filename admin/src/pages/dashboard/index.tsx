import { useEffect } from 'react'
import { Row, Col, Card, List, Space } from 'antd'
import styles from './style.less'
import { inject, observer } from 'mobx-react'
import { CommonStore } from '@/store'
import dayjs from 'dayjs'
const formatDate = 'YYYY-MM-DD HH:mm'

const Dashboard = ({ commonStore }: { commonStore: CommonStore }) => {
  useEffect(() => {
    commonStore.getDashboardInfo()
  }, [])

  const { article, comment, user } = commonStore.dashboardInfo
  const countData = [
    { title: '文章总数', value: article?.count || 0 },
    { title: '评论总数', value: comment?.count || 0 },
  ]
  return (
    <div className={styles.page}>
      <Row gutter={16}>
        <Col span={16}>
          <Card title="数据统计">
            <Row gutter={16}>
              {countData.map(({ title, value }) => (
                <Col key={title} span={8}>
                  <div className={styles.pannel}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.count}>{value}</div>
                  </div>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="用户信息">
            <p>
              上次登录时间： {user?.last_login_at && dayjs(user?.last_login_at).format(formatDate)}
            </p>
            <p>上次登录IP： {user?.last_login_ip?.replace('::ffff:', '')}</p>
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={16}>
          <Card title="最新评论">
            <List
              itemLayout="horizontal"
              dataSource={comment?.data || []}
              renderItem={({ name, article, created_at, content }) => (
                <List.Item>
                  <List.Item.Meta
                    style={{ width: '100%' }}
                    title={
                      <>
                        <span style={{ marginRight: 5 }}>{name}</span>
                        <Space>
                          在
                          <a target="_blank" href={`/article/${article?.id}`}>
                            {article?.title}
                          </a>
                          评论
                        </Space>
                        <span style={{ float: 'right' }}>
                          {created_at && dayjs(created_at).format(formatDate)}
                        </span>
                      </>
                    }
                    description={content}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default inject('commonStore')(observer(Dashboard))
