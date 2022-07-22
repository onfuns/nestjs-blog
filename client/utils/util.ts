export const isServer = typeof window === 'undefined'

export const findByValue = (array, key, value, { childKey = 'children' } = {}) => {
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
