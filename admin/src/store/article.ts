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

  set(key: keyof NonFunctionProperties<ArticleStore>, value: any) {
    this[key] = value
  }

  async get(params?: Record<string, any>) {
    const { data } = await getArticleList(params)
    if (data) {
      this.set('result', data)
    }
  }

  async update(id: number, params?: Record<string, any>) {
    return await updateArticle(id, params)
  }

  async add(params?: Record<string, any>) {
    return await addArticle(params)
  }

  async delete(id: number) {
    return await deleteArticle(id)
  }

  async getInfoById(id: number) {
    const { data } = await getArticleInfoById(id)
    if (data) {
      this.set('detail', data)
    }
  }
}

export default new ArticleStore()
