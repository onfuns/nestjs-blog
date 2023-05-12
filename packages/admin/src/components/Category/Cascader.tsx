import { getCategoryList } from '@/actions/category'
import { useRequest } from 'ahooks'
import { Cascader } from 'antd'
import { useEffect, useState } from 'react'

interface IProps {
  onChange?: (...args) => void
  root?: boolean
  value?: any[]
  disabled?: boolean
}

export default function CategoryCascader({
  onChange,
  root = true,
  value = [],
  disabled = false,
}: IProps) {
  const {
    data: { data: categoryList = [] },
  } = useRequest(getCategoryList)
  const [val, setVal] = useState([])

  useEffect(() => {
    setVal(value)
  }, [JSON.stringify(value)])

  const onTrigger = (value) => {
    setVal(value)
    onChange?.(value)
  }

  return (
    <Cascader
      disabled={disabled}
      placeholder="请选择分类"
      allowClear={false}
      options={root ? [{ id: 0, name: '一级分类' }].concat(categoryList) : categoryList}
      defaultValue={root ? [0] : []}
      value={val}
      fieldNames={{ label: 'name', value: 'id', children: 'children' }}
      onChange={onTrigger}
      getPopupContainer={(node: HTMLElement) => node.parentNode as HTMLElement}
      changeOnSelect
    />
  )
}
