import { useState, useEffect } from 'react'

export const useFetch = (fn: Function, deps: any[] = []) => {
  const [data, setData] = useState(null)
  useEffect(() => {
    const loadData = async () => {
      const data = await fn()
      setData(data)
    }
    loadData()
  }, deps)
  return data
}
