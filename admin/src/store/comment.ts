import { makeAutoObservable } from 'mobx'
import { getCommentList, addComment, updateComment, deleteComment } from '@/actions/comment'

export class CommentStore {
  result: { list: any[]; count: number } | null = {} as any

  constructor() {
    makeAutoObservable(this)
  }

  set(key: 'result', value: any) {
    this[key] = value
  }

  async get(params?: Record<string, any>) {
    const { success, data } = await getCommentList(params)
    if (success) {
      this.set('result', data)
    }
  }

  async update(params?: Record<string, any>) {
    return await updateComment(params)
  }

  async add(params?: Record<string, any>) {
    return await addComment(params)
  }

  async delete(params?: Record<string, any>) {
    return await deleteComment(params)
  }
}

export default new CommentStore()
