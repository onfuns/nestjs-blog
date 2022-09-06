import { createContext } from 'react'
import { enableStaticRendering } from 'mobx-react'
import { ArticleStore } from './article'
import { CategoryStore } from './category'
import { CommentStore } from './comment'
import { isServer } from '@/utils/util'
enableStaticRendering(isServer)

export const RootStore = {
  articleStore: new ArticleStore(),
  categoryStore: new CategoryStore(),
  commentStore: new CommentStore(),
}

export const storesContext = createContext(RootStore)
