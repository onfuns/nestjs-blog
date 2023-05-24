import { ArticleCarousel, ArticleList, ArticleMenu, type IListProps } from '@/components/Article'
import { findByValue } from '@/utils'
import markdownIt from 'markdown-it'

export interface IArticlePageProps {
  categoryList: any[]
  articleData: IListProps['result']
}

export default function Article({ categoryList, articleData }: IArticlePageProps) {
  return (
    <div className="w-1000-center flex">
      <ArticleMenu data={categoryList} />
      <div className="w-1000 overflow-hidden">
        <ArticleCarousel />
        <ArticleList result={articleData} />
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
  articleData?.data?.map((acticle) => {
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
