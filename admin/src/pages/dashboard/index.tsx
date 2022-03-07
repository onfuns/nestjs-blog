import { Row, Col, Card, List } from 'antd'
import styles from './style.less'

interface ICount {
  title: string
  value: number
  color?: string
}

const CountPannel = ({ data = [] }: { data: ICount[] }) => {
  return (
    <Card title="数据统计">
      <Row>
        {data.map(({ title, value, color }) => (
          <Col key={title} span={4} offset={1} className={styles.pannel}>
            <div className={styles.count} style={{ color, borderTop: `1px solid ${color}` }}>
              {value}
            </div>
            <div className={styles.title}>{title}</div>
          </Col>
        ))}
      </Row>
    </Card>
  )
}

export default () => {
  const dataSource: any = {}
  const { article = 0, comments = {} } = dataSource
  const { rows = [], count = 0 } = comments
  const countData = [
    { title: '评论总数', value: count, color: '#30cbcb' },
    { title: '文章总数', value: article, color: '#fbd441' },
  ]
  return (
    <div className={styles.page}>
      <CountPannel data={countData} />
      <Card title="最新评论" style={{ marginTop: 20 }}>
        <List
          itemLayout="horizontal"
          dataSource={rows}
          renderItem={(item: any) => (
            <List.Item>
              <List.Item.Meta
                style={{ width: '100%' }}
                title={
                  <div>
                    <span style={{ marginRight: 5 }}>{item.nickname}</span>在
                    <a
                      target="_blank"
                      href={`/article/${item.post.id}`}
                      className={styles.postLink}
                    >
                      {item.post.title}
                    </a>
                    评论
                    <span style={{ float: 'right' }}>2021-08-18 15:02:35</span>
                  </div>
                }
                description={item.content}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  )
}
