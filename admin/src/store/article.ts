import { makeAutoObservable } from 'mobx'
import {
  getArticleList,
  updateArticle,
  addArticle,
  getArticleInfoById,
  deleteArticle,
} from '@/actions/article'

export class ArticleStore {
  result: { data?: any[]; count?: number } | null = {}
  detail: any = {}

  constructor() {
    makeAutoObservable(this)
  }

  set(key: 'result' | 'detail', value: any) {
    this[key] = value
  }

  async get(params?: Record<string, any>) {
    const { success, data } = await getArticleList(params)
    if (success) {
      this.set('result', data)
    }
  }

  async update(params?: Record<string, any>) {
    return await updateArticle(params)
  }

  async add(params?: Record<string, any>) {
    return await addArticle(params)
  }

  async delete(params?: Record<string, any>) {
    return await deleteArticle(params)
  }

  async getInfoById(params?: Record<string, any>) {
    const { success, data } = await getArticleInfoById(params)
    if (success) {
      this.set('detail', data)
    }
  }
}

export default new ArticleStore()
