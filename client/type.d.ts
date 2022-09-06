type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends () => void ? never : K
}[keyof T]

type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>
