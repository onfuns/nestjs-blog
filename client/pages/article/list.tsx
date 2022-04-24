import Menu from '@/components/Layout/Menu'
import styles from './list.module.less'
import classnames from 'classnames'
import markdownIt from 'markdown-it'
import ListItem from '@/components/Article/ListItem'
import CarouselPanel from '@/components/CarouselPanel'

const Article = ({ categoryList, articleData }) => {
  const { data: acticleList, count: acticleTotal } = articleData || {}

  return (
    <div className={classnames('container', styles.page)}>
      <Menu data={categoryList} />
      <div className={styles.content}>
        <CarouselPanel />
        <ListItem data={acticleList} count={acticleTotal} />
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ req }) => {
  const { articleStore, categoryStore } = req.mobxStore
  await categoryStore.get()
  const { ename } = req.params
  const { page } = req.query
  let params: any = { current: page || 1, pageSize: 20 }
  if (ename) {
    const { id } = categoryStore?.data?.find(c => c.ename.slice(1) === ename) || {}
    if (id) params.cid = id
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
      categoryList: categoryStore.data || [],
      articleData,
    },
  }
}

export default Article
