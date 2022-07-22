import { makeAutoObservable } from 'mobx'
import { getArticleList, getArticleInfoById } from '@/actions/article'

export class ArticleStore {
  result = { data: [], count: 0 }
  info = {}

  constructor() {
    makeAutoObservable(this)
  }

  set(key: keyof NonFunctionProperties<ArticleStore>, value) {
    this[key] = value
  }

  async get(params = {}) {
    const { data } = await getArticleList(params)
    this.set('result', data || [])
    return this.result
  }

  async getInfoById(id) {
    const { data } = await getArticleInfoById({ id })
    this.set('info', data || {})
  }
}

export default new ArticleStore()
