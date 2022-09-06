import { Fragment } from 'react'
import styles from './style.module.less'
import { Pagination } from 'antd'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'

export default function List({ data, count = 0 }) {
  const router = useRouter()

  const onPaginationChange = page => {
    const { origin, pathname } = window.location
    window.open(`${origin}${pathname}?page=${page}`, '_self')
  }

  return (
    <div className={styles.list}>
      {data?.map(
        ({ title, id, publish_time, author = '匿名', tags = [], description = '' }, index) => (
          <div key={index} className={styles.listItem}>
            <div className={styles.meta}>
              <span>{dayjs(publish_time).fromNow()}</span>
              <span>
                <i className={styles.divide}>/</i>
                {author}
              </span>
            </div>
            <a href={`/article/${id}`} className={styles.title}>
              {title}
            </a>
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: description }}
            ></div>
            <div className={styles.tag}>
              {tags.map((tag, tIdx) => (
                <Fragment key={tIdx}>
                  {tIdx === 0 && <i className="iconfont icon-biaoqian1"></i>}
                  <span>{tag.name}</span>
                </Fragment>
              ))}
            </div>
          </div>
        ),
      )}
      {count > 20 && (
        <div className={styles.pagination}>
          <Pagination
            defaultCurrent={(router?.query?.page || 1) as number}
            total={count}
            size="small"
            pageSize={20}
            hideOnSinglePage
            onChange={onPaginationChange}
          />
        </div>
      )}
    </div>
  )
}
