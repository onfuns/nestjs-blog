import { useEffect, useState } from 'react'
import { Table, TableProps } from 'antd'
import { defaultPageParams, pagination } from '@/utils/pages'

interface IProps {
  reloadKey: any
  data: { list?: any[]; count?: number }
  columns: any[]
  page?: boolean
  searchFilter?: Record<string, any>
  onChange?: (args?: any) => void
  onLoad?: (args?: any) => void
}

const ListTable = ({
  reloadKey,
  data,
  columns,
  onLoad,
  page = true,
  searchFilter = {},
}: IProps) => {
  const [loading, setLoading] = useState(false)
  const pages = page
    ? { pageSize: defaultPageParams.pageSize, current: defaultPageParams.current }
    : {}
  const [filter, setFilter] = useState({ ...pages })

  const loadData = async () => {
    setLoading(true)
    onLoad(filter)
    setLoading(false)
  }

  useEffect(() => {
    reloadKey && loadData()
  }, [reloadKey])

  useEffect(() => {
    Object.keys(searchFilter).length && setFilter({ ...filter, ...searchFilter })
  }, [searchFilter])

  useEffect(() => {
    Object.keys(filter).length && loadData()
  }, [filter])

  const onTalbeChange = (values = {}) => {
    const data = { ...pages, ...filter, ...values }
    setFilter(data)
  }

  const dataSource = data.list || []
  const tableProps: TableProps<any> = {
    columns,
    dataSource: dataSource,
    rowKey: ({ id }) => id,
    pagination: page
      ? {
          ...pagination,
          total: data.count || 0,
          current: filter.current,
          pageSize: filter.pageSize,
        }
      : false,
    loading,
    bordered: true,
    size: 'small',
    onChange: onTalbeChange,
    expandedRowKeys: dataSource.map(({ id }) => id),
    style: { marginTop: 10 },
  }

  return <Table {...tableProps} />
}

export default ListTable
