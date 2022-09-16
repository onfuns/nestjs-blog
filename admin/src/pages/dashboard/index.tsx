import { Row, Col, Card, List, Space } from 'antd'
import styles from './style.module.less'
import dayjs from 'dayjs'
import { useFetch } from '@/hooks'
import { getDashboardData } from '@/actions/common'
const timeFormat = 'YYYY-MM-DD HH:mm:ss'

type IDashboardInfoProps = {
  article?: { count: number }
  comment?: { count: number; data: any[] }
  user?: Record<any, string>
}

export default () => {
  const res = useFetch(getDashboardData)
  const { article, comment, user } = res?.data || ({} as IDashboardInfoProps)

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
              上次登录时间： {user?.last_login_at && dayjs(user?.last_login_at).format(timeFormat)}
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
              renderItem={(record: any) => (
                <List.Item>
                  <List.Item.Meta
                    style={{ width: '100%' }}
                    title={
                      <>
                        <span style={{ marginRight: 5 }}>{record.name}</span>
                        <Space>
                          在
                          <a
                            target="_blank"
                            href={`/article/${record?.article?.id}`}
                            rel="noreferrer"
                          >
                            {record?.article?.title}
                          </a>
                          评论
                        </Space>
                        <span style={{ float: 'right' }}>
                          {record.created_at && dayjs(record.created_at).format(timeFormat)}
                        </span>
                      </>
                    }
                    description={record.content}
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
