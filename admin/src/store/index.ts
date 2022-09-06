import { createContext } from 'react'

import { HeaderStore } from './header'
import { ArticleStore } from './article'
import { CategoryStore } from './category'
import { TagStore } from './tag'
import { UserStore } from './user'
import { RoleStore } from './role'
import { AuthStore } from './auth'
import { CommentStore } from './comment'
import { CommonStore } from './common'

export const RootStore = {
  headerStore: new HeaderStore(),
  articleStore: new ArticleStore(),
  categoryStore: new CategoryStore(),
  tagStore: new TagStore(),
  userStore: new UserStore(),
  roleStore: new RoleStore(),
  authStore: new AuthStore(),
  commentStore: new CommentStore(),
  commonStore: new CommonStore(),
}

export const storesContext = createContext(RootStore)
