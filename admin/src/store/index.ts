import { createContext } from 'react'

import { HeaderStore } from './header'
import { ArticleStore } from './article'
import { CategoryStore } from './category'
import { TagStore } from './tag'
import { UserStore } from './user'
import { RoleStore } from './role'
import { AuthStore } from './auth'
import { CommentStore } from './comment'
import { FileStore } from './file'
import { WebsiteStore } from './website'

export const RootStore = {
  headerStore: new HeaderStore(),
  articleStore: new ArticleStore(),
  categoryStore: new CategoryStore(),
  tagStore: new TagStore(),
  userStore: new UserStore(),
  roleStore: new RoleStore(),
  authStore: new AuthStore(),
  commentStore: new CommentStore(),
  fileStore: new FileStore(),
  websiteStore: new WebsiteStore(),
}

export const storesContext = createContext(RootStore)
