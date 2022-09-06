import { makeAutoObservable } from 'mobx'
import { getArticleList, getArticle } from '@/actions/article'

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
    const { data } = await getArticle({ id })
    this.set('info', data || {})
    return this.info
  }
}
