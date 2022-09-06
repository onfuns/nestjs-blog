import { useContext } from 'react'
import { storesContext } from '@/store'

export const useStore = () => useContext(storesContext)
