export class Cache {
  get(key: string) {
    const value = localStorage.getItem(key)
    try {
      return JSON.parse(value)
    } catch (error) {
      return value
    }
  }
  set(key: string, value) {
    localStorage.setItem(key, this.isObject(value) ? JSON.stringify(value) : value)
  }
  remove(key: string) {
    localStorage.removeItem(key)
  }
  isObject(value) {
    return value instanceof Object
  }
}

export default new Cache()
