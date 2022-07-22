import { useEffect } from 'react'
import { Input, Button, Form, Row, Col, message } from 'antd'
import dayjs from 'dayjs'
import styles from './style.module.less'
import { inject, observer } from 'mobx-react'
import { CommentStore } from '@/store'

interface IProps {
  articeId: string
  commentStore?: CommentStore
}

const Comment = ({ articeId, commentStore }: IProps) => {
  const [form] = Form.useForm()

  const onSubmit = () => {
    form.validateFields().then(async values => {
      const { success } = await commentStore.add({ ...values, aid: articeId })
      if (success) {
        message.success('评论成功，请耐心等待审核哦~')
        form.resetFields()
      } else {
        message.error('失败啦，歇会再试吧~')
      }
    })
  }

  const loadData = () => {
    if (articeId) commentStore.get({ aid: articeId })
  }

  useEffect(() => {
    loadData()
  }, [])

  const { result: { data = [] } = {} } = commentStore

  return (
    <div className={styles.comment}>
      <div className={styles.header}>评论</div>
      <div className={styles.content}>
        <img className={styles.avatar} src="/image/avatar.png" />
        <Form className={styles.form} form={form}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="name" rules={[{ required: true, message: '请输入昵称' }]}>
                <Input placeholder="请输入昵称" maxLength={10} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="url"
                rules={[{ required: true, message: '请输入网址', pattern: /^https?/ }]}
              >
                <Input placeholder="请输入网址" maxLength={50} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="content" rules={[{ required: true, message: '请输入内容' }]}>
            <Input.TextArea
              style={{ minHeight: 100, maxHeight: 150 }}
              maxLength={200}
              placeholder="请输入内容"
            />
          </Form.Item>
          <div className={styles.btns}>
            <Button type="primary" onClick={onSubmit}>
              立即评论
            </Button>
            <span className={styles.tips}>请文明评论哦~</span>
          </div>
        </Form>
      </div>

      {data.length ? (
        <div className={styles.listContent}>
          <div className={styles.header}>全部评论</div>
          <div className={styles.list}>
            {data?.map((item, index) => (
              <div className={styles.listItem} key={index}>
                <img className={styles.avatar} src="/image/avatar.png" />
                <div className={styles.listRow}>
                  <div className={styles.listMeta}>
                    <a href={item.url} target="_blank" className={styles.name}>
                      {item.name}
                    </a>
                    <span className={styles.time}>{dayjs(item.created_at).fromNow()}</span>
                  </div>
                  <p>{item.content}</p>
                  {item.reply && <div className={styles.replyContent}>回复：{item.reply}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default inject('commentStore')(observer(Comment))
