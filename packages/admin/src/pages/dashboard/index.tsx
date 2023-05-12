import { getDashboardData } from '@/actions/common'
import { TIME_STRING } from '@/constants'
import { useRequest } from 'ahooks'
import { Card, Col, List, Row, Space } from 'antd'
import dayjs from 'dayjs'

type IDashboardInfoProps = {
  article?: { count: number }
  comment?: { count: number; data: any[] }
  user?: Record<any, string>
}

export default function DashboardPage() {
  const {
    data: { data: dashboardData },
  } = useRequest(getDashboardData)
  const { article, comment, user } = dashboardData as IDashboardInfoProps

  const countData = [
    { title: '文章总数', value: article?.count || 0 },
    { title: '评论总数', value: comment?.count || 0 },
  ]
  return (
    <>
      <Row gutter={16}>
        <Col span={16}>
          <Card title="数据统计">
            <Row gutter={16}>
              {countData.map(({ title, value }) => (
                <Col key={title} span={8}>
                  <div className="py-15 pl-20 border-1 border-solid border-#e6ebf5 border-rd-2 shadow-[0_2px_12px_0_rgba(0,0,0,0.1)]">
                    <div className="color-#a3aed0">{title}</div>
                    <div className="text-size-26">{value}</div>
                  </div>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="用户信息">
            <p>
              上次登录时间： {user?.last_login_at && dayjs(user.last_login_at).format(TIME_STRING)}
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
                          {record.created_at && dayjs(record.created_at).format(TIME_STRING)}
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
    </>
  )
}
