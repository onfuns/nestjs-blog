import * as request from 'supertest'

const baseUrl = 'http://localhost:4000'

describe('文章模块', () => {
  it('获取文章列表成功', done => {
    return request(baseUrl)
      .get('/api/article/client/list')
      .send({ current: 1, pageSize: 20 })
      .expect(200)
      .expect(res => {
        expect(res.body.data).not.toBeNull()
      })
      .end(err => {
        if (err) return done(err)
        return done()
      })
  })
})
