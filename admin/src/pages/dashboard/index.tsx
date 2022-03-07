import { Row, Col, Card, List } from 'antd'
import styles from './style.less'

interface ICount {
  title: string
  icon?: string
  total: number
  color?: string
}

const CountPannel = ({ data = [] }: { data: ICount[] }) => {
  return (
    <Card>
      <Row>
        {data.map((d, index) => (
          <Col key={index} span={6} offset={1} className={styles.pannelItem}>
            <Col span={10} className={styles.pannelItemIcon} style={{ background: d.color }}></Col>
            <Col span={14} className={styles.pannelItemText}>
              <div style={{ color: d.color }}>{d.total}</div>
              <div>{d.title}</div>
            </Col>
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
    { title: '评论总数', icon: '', total: count, color: '#30cbcb' },
    { title: '文章总数', icon: '', total: article, color: '#fbd441' },
  ]
  return (
    <div className={styles.dashboardPage}>
      <CountPannel data={countData} />
      <div style={{ marginTop: 20 }}>
        <Card title="最新评论">
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
    </div>
  )
}
