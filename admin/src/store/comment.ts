import { makeAutoObservable } from 'mobx'
import { getCommentList, addComment, updateComment, deleteComment } from '@/actions/comment'

export class CommentStore {
  result: { data: any[]; count: number } | null = {} as any

  constructor() {
    makeAutoObservable(this)
  }

  set(key: keyof NonFunctionProperties<CommentStore>, value: any) {
    this[key] = value
  }

  async get(params?: Record<string, any>) {
    const { data } = await getCommentList(params)
    if (data) {
      this.set('result', data)
    }
  }

  async update(id: number, params?: Record<string, any>) {
    return await updateComment(id, params)
  }

  async add(params?: Record<string, any>) {
    return await addComment(params)
  }

  async delete(id: number) {
    return await deleteComment(id)
  }
}

export default new CommentStore()
