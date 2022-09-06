import styles from './style.module.less'
import classnames from 'classnames'
import markdownIt from 'markdown-it'
import ArticleList from '@/components/Article/List'
import ArticleMenu from '@/components/Article/Menu'
import CarouselPanel from '@/components/CarouselPanel'
import { findByValue } from '@/utils/util'

export default function Article({
  categoryList,
  articleData,
}: {
  categoryList: any[]
  articleData: { data: any[]; count: number }
}) {
  return (
    <div className={classnames('page-container', styles.page)}>
      <ArticleMenu data={categoryList} />
      <div className={styles.content}>
        <CarouselPanel />
        <ArticleList data={articleData.data} count={articleData.count} />
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ req, query }) => {
  const { articleStore, categoryStore } = req.mobxStore
  await categoryStore.get()
  const ename = query?.ename
  const params: { current: number; pageSize: number; cid?: string } = {
    current: req.query?.page || 1,
    pageSize: 20,
  }

  const categoryList = categoryStore.result
  const defaultProps = {
    categoryList,
    articleData: {},
  }

  if (ename) {
    const category = findByValue(categoryList, 'ename', `/${ename}`)
    if (category?.id) {
      params.cid = category?.id
    } else {
      return { props: defaultProps }
    }
  }
  const articleData = await articleStore.get(params)
  articleData?.data?.map(acticle => {
    if (!acticle.description) {
      const more = acticle.content.indexOf('<!--more-->')
      if (more > -1) {
        acticle.description = markdownIt().render(acticle.content.substring(0, more))
      }
    }
    return acticle
  })

  return {
    props: {
      ...defaultProps,
      articleData,
    },
  }
}
