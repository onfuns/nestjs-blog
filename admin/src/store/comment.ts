import { makeAutoObservable } from 'mobx'
import { getCommentList, addComment, updateComment, deleteComment } from '@/actions/comment'

export class CommentStore {
  result: { list: any[]; count: number } | null = {} as any
  detail: any = {}

  constructor() {
    makeAutoObservable(this)
  }

  async get(params = {}) {
    const data = await getCommentList(params)
    if (data.success) {
      this.result = data.data
    }
  }

  async update(params = {}) {
    return await updateComment(params)
  }

  async add(params = {}) {
    return await addComment(params)
  }

  async delete(params = {}) {
    return await deleteComment(params)
  }
}

export default new CommentStore()
