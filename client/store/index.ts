import { enableStaticRendering } from 'mobx-react'
import { default as articleStore, ArticleStore } from './article'
import { default as categoryStore, CategoryStore } from './category'
import { default as commentStore, CommentStore } from './comment'
import { isServer } from '@/utils/util'
enableStaticRendering(isServer)

export { ArticleStore, CategoryStore, CommentStore }

const stories = {
  articleStore,
  categoryStore,
  commentStore,
}

let store = null
export default function initializeStore() {
  if (isServer) {
    return stories
  }
  if (store === null) {
    store = stories
  }
  return store
}
