export const isServer = typeof window === 'undefined'
export { default as api } from './api'

export const findByValue = (
  array: any[],
  key: string,
  value: string | number,
  { childKey = 'children' } = {},
) => {
  let obj: any
  array.some(function iter(item) {
    if (item[key] === value) {
      obj = item
      return true
    }
    return Array.isArray(item[childKey]) && item[childKey].some(iter)
  })
  return obj
}
