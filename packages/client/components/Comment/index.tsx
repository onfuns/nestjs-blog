import { useStore } from '@/hooks'
import { Button, Col, Form, Input, message, Row } from 'antd'
import classnames from 'classnames'
import dayjs from 'dayjs'
import { observer } from 'mobx-react'
import { useEffect } from 'react'
import styles from './style.module.scss'

export default observer(({ articeId }: { articeId: string }) => {
  const { commentStore } = useStore()
  const [form] = Form.useForm()

  const onSubmit = async () => {
    const values = await form.validateFields()
    const { success } = await commentStore.add({ ...values, aid: articeId })
    if (success) {
      message.success('评论成功，请耐心等待审核哦~')
      form.resetFields()
    } else {
      message.error('失败啦，歇会儿再试吧~')
    }
  }

  useEffect(() => {
    if (articeId) commentStore.get({ aid: articeId })
  }, [])

  const { result: { data = [] } = {} } = commentStore

  return (
    <div className={classnames(styles.commentPage, ' w-720 bg-#fff p-20 mt-20 rd-4')}>
      <div className="text-size-18 lh-30 fw-600 color-#252933 mb-10">评论</div>
      <div className="flex items-start">
        <img className="mr-16 w-40 h-40 border-r-50%" src="/images/avatar.png" />
        <Form className="flex-[1-1-auto] relative" form={form}>
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
                <Input placeholder="请输入网址" maxLength={200} />
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
          <div className="flex justify-between">
            <Button type="primary" onClick={onSubmit}>
              立即评论
            </Button>
            <span className="color-#999">请文明评论哦~</span>
          </div>
        </Form>
      </div>

      {data?.length > 0 && (
        <div className="mt-20">
          <div className="text-size-18 lh-30 fw-600 color-#252933 mb-10">全部评论</div>
          <div>
            {data?.map((item, index) => (
              <div className="flex color-#515767 py-10" key={index}>
                <img className="mr-16 w-40 h-40 border-r-50%" src="/images/avatar.png" />
                <div className="flex-1">
                  <div className="flex items-center justify-between  mb-10">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="fw-500 text-size-15 color-#252933 max-w-130 lh-26 overflow-hidden text-ellipsis mb-0"
                    >
                      {item.name}
                    </a>
                    <span className="color-#8a919f">{dayjs(item.created_at).fromNow()}</span>
                  </div>
                  <p>{item.content}</p>
                  {item.reply && <div className="p-16 bg-#f7f8fab3 rd-4">回复：{item.reply}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
})
