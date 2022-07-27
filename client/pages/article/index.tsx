import Menu from '@/components/Layout/Menu'
import styles from './style.module.less'
import classnames from 'classnames'
import markdownIt from 'markdown-it'
import ListItem from '@/components/Article/ListItem'
import CarouselPanel from '@/components/CarouselPanel'
import { findByValue } from '@/utils/util'

const Article = ({ categoryList, articleData }) => {
  const { data: acticleList, count } = articleData || {}

  return (
    <div className={classnames('container', styles.page)}>
      <Menu data={categoryList} />
      <div className={styles.content}>
        <CarouselPanel />
        <ListItem data={acticleList} count={count} />
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ req, query }) => {
  const { articleStore, categoryStore } = req.mobxStore
  await categoryStore.get()
  const ename = query?.ename
  const current = req.query?.page || 1
  const params: Record<string, any> = { current, pageSize: 20 }

  const defaultProps = {
    categoryList: categoryStore.result || [],
    articleData: [],
  }

  if (ename) {
    const category = findByValue(categoryStore.result, 'ename', `/${ename}`)
    if (category?.id) {
      params.cid = category?.id
    } else {
      return { props: defaultProps }
    }
  }
  const articleData = (await articleStore.get(params)) || null
  articleData?.data?.map(acticle => {
    if (!acticle.description) {
      const moreIndex = acticle.content.indexOf('<!--more-->')
      if (moreIndex > -1) {
        acticle.description = markdownIt().render(acticle.content.substring(0, moreIndex))
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

export default Article
