import { useEffect, useState } from 'react'

export const useFetch = (fn: Function, params?: any, deps: any[] = []) => {
  const [data, setData] = useState(undefined)
  const [loading, setLoading] = useState(false)

  const loadData = async (newParams = {}) => {
    setLoading(true)
    const payload = newParams ? { ...params, ...newParams } : params
    const data = await fn(payload)
    setLoading(false)
    setData(data)
  }

  useEffect(() => {
    loadData()
  }, deps)

  const reload = (newParams = {}) => {
    loadData(newParams)
  }

  return [data ?? {}, reload, loading]
}
