import { makeAutoObservable } from 'mobx'
import { getArticleList, getArticleDetailById } from '@/actions/article'

export class ArticleStore {
  result = { data: [], count: 0 }
  detail = {}

  constructor() {
    makeAutoObservable(this)
  }

  set(key: 'result' | 'detail', value) {
    this[key] = value
  }

  async get(params = {}) {
    const { data } = await getArticleList(params)
    this.set('result', data || [])
    return this.result
  }

  async getInfoById(params) {
    const { data } = await getArticleDetailById(params)
    this.set('detail', data || {})
  }
}

export default new ArticleStore()
