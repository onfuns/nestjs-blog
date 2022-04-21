import { makeAutoObservable } from 'mobx'
import { getCommentList, addComment } from '@/actions/comment'

export class CommentStore {
  result: { list: any[]; count?: number } | null = { list: [] }

  constructor() {
    makeAutoObservable(this)
  }

  set(key: 'result', value) {
    this[key] = value
  }

  async get(params = {}) {
    const { data } = await getCommentList(params)
    this.set('result', data || [])
  }

  async add(params = {}) {
    return await addComment(params)
  }
}

export default new CommentStore()
