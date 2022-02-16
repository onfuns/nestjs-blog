import { makeAutoObservable } from 'mobx'
import {
  getArticleList,
  updateArticle,
  addArticle,
  getArticleInfoById,
  deleteArticle,
} from '@/actions/article'

export class ArticleStore {
  result: { list?: any[]; count?: number } | null = {}
  detail: any = {}

  constructor() {
    makeAutoObservable(this)
  }

  async get(params = {}) {
    const data = await getArticleList(params)
    if (data.success) {
      this.result = data.data
    }
  }

  async update(params = {}) {
    return await updateArticle(params)
  }

  async add(params = {}) {
    return await addArticle(params)
  }

  async delete(params = {}) {
    return await deleteArticle(params)
  }

  async getInfoById(params = {}) {
    const data = await getArticleInfoById(params)
    if (data.success) {
      this.setDetail(data.data)
    }
  }

  setDetail(data) {
    this.detail = data
  }
}

export default new ArticleStore()
