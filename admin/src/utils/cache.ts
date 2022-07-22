export class Cache {
  get(key: string) {
    let value = localStorage.getItem(key)
    try {
      value = JSON.parse(value)
    } catch (error) {}
    return value
  }
  set(key: string, value: any) {
    localStorage.setItem(key, this.isObject(value) ? JSON.stringify(value) : value)
  }
  remove(key: string) {
    localStorage.removeItem(key)
  }
  isObject(value: any) {
    return value instanceof Object
  }
}

export default new Cache()
