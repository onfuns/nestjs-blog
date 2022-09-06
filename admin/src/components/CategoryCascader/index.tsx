import { useEffect, useState } from 'react'
import { Cascader } from 'antd'
import { observer } from 'mobx-react'
import { useStore } from '@/hooks'

interface IProps {
  onChange?: (...args) => void
  root?: boolean
  value?: any[]
  disabled?: boolean
}

export default observer(({ onChange, root = true, value = [], disabled = false }: IProps) => {
  const { categoryStore } = useStore()
  const [val, setVal] = useState([])

  useEffect(() => {
    categoryStore.get()
  }, [])

  useEffect(() => {
    setVal(value)
  }, [JSON.stringify(value)])

  const onTrigger = value => {
    setVal(value)
    onChange?.(value)
  }

  const { result = [] } = categoryStore
  return (
    <Cascader
      disabled={disabled}
      placeholder="请选择分类"
      allowClear={false}
      options={root ? [{ id: 0, name: '一级分类' }].concat(result) : result}
      defaultValue={root ? [0] : []}
      value={val}
      fieldNames={{ label: 'name', value: 'id', children: 'children' }}
      onChange={onTrigger}
      getPopupContainer={(node: HTMLElement) => node.parentNode as HTMLElement}
      changeOnSelect
    />
  )
})
