import { useEffect, useState, forwardRef } from 'react'
import { Cascader } from 'antd'
import { inject, observer } from 'mobx-react'
import { CategoryStore } from '@/store'

interface IProps {
  onChange?: (...args) => void
  root?: boolean
  categoryStore?: CategoryStore
  value?: any[]
  disabled?: boolean
}
const CategoryCascader = (
  { onChange = () => {}, root = true, categoryStore, value = [], disabled = false }: IProps,
  ref,
) => {
  const [val, setVal] = useState([])

  useEffect(() => {
    const loadData = async () => {
      await categoryStore.get()
    }
    loadData()
  }, [])

  useEffect(() => {
    setVal(value)
  }, [JSON.stringify(value)])

  const onTrigger = value => {
    setVal(value)
    onChange(value)
  }

  const { result = [] } = categoryStore || {}
  return (
    <Cascader
      disabled={disabled}
      ref={ref}
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
}

export default inject('categoryStore')(observer(forwardRef(CategoryCascader)))
