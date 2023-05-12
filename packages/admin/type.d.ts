type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends (...args) => any ? never : K
}[keyof T]

type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>

type IDetailModalProps = {
  element?: any
  onClose?: () => void
  onSuccess?: (args?: any) => void
  detail?: Record<string, any>
}
