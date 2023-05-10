import { addComment, getCommentList } from '@/actions/comment'
import { makeAutoObservable } from 'mobx'

export class CommentStore {
  result: { data: any[]; count?: number } | null = { data: [] }

  constructor() {
    makeAutoObservable(this)
  }

  set(key: keyof NonFunctionProperties<CommentStore>, value) {
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
