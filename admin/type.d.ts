type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K
}[keyof T]

type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>

type ICreateModalProps = {
  visible?: boolean
  type?: 'add' | 'edit'
  record?: Record<string, any>
}

type IDetailModalProps = {
  onCancel?: () => void
  onSuccess?: (args?: any) => void
  detail?: Record<string, any>
}
