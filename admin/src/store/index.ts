import { createContext } from 'react'

import { HeaderStore } from './header'
import { RoleStore } from './role'

export const RootStore = {
  headerStore: new HeaderStore(),
  roleStore: new RoleStore(),
}

export const storesContext = createContext(RootStore)
