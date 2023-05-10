import { storesContext } from '@/store'
import { useContext } from 'react'

export const useStore = () => useContext(storesContext)
