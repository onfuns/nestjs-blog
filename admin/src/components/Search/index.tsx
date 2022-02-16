import { Select, Input } from 'antd'
import styles from './style.module.less'
import classnames from 'classnames'

interface IData {
  type: 'search' | 'select'
  key: string
  options?: { label: string; value: string | number }[]
  [key: string]: any
}

interface IProps {
  data: IData[]
  className?: string
  onChange?: (...args) => void
}

const Search = ({ data = [], className, onChange = () => {} }: IProps) => {
  return (
    <div className={classnames(styles.search)}>
      <div className={classnames(styles.searchContent, className)}>
        {data.map(({ type, options = [], key, ...other }, index) => {
          if (type === 'select') {
            return (
              <Select
                key={index}
                {...other}
                className={styles.searchItem}
                onChange={value => onChange({ [key]: value })}
              >
                {options.map(({ label, value }, index) => (
                  <Select.Option key={index} value={value}>
                    {label}
                  </Select.Option>
                ))}
              </Select>
            )
          } else if (type === 'search') {
            return (
              <Input.Search
                key={index}
                {...other}
                className={styles.searchItem}
                onSearch={value => onChange({ [key]: value })}
                allowClear
              />
            )
          }
        })}
      </div>
    </div>
  )
}

export default Search
