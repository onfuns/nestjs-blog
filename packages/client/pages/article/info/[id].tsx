import { ArticleAnchor } from '@/components/Article'
import Comment from '@/components/Comment'
import dayjs from 'dayjs'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import markdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'
import './md.theme.scss'

export interface IArticleInfoProps {
  id: string
  title: string
  content: string
  category?: { id: number; name: string }
  tags?: { id: number; name: string }[]
  created_at: string
  comment_flag: 0 | 1
}

export default function ArticleInfo({ article }: { article: IArticleInfoProps }) {
  const spanClass = 'inline-flex items-center mr-12'
  const dividerClass = 'mr-5 text-size-16 font-not-italic'

  return (
    <div className="w-1000-center py-10">
      <div className="flex w-100%">
        <div className="p-24 bg-#fff border-r-4 flex-1">
          <div className="mb-6 lh-1.4 text-size-30 fw-700 color-#303030 ml-0 indent-0 break-all">
            {article.title}
          </div>
          <div className="color-#666 mt-8">
            <span className={spanClass}>
              <i className={`iconfont icon-shijian ${dividerClass}`}></i>
              {dayjs(article.created_at).format('YYYY年MM月DD日')}
            </span>
            <span className={spanClass}>
              <i className={`iconfont icon-leimupinleifenleileibie ${dividerClass}`}></i>
              分类：{article.category?.name}
            </span>
            {article?.tags?.length > 0 && (
              <span className={spanClass}>
                <i className={`iconfont icon-biaoqian1 ${dividerClass}`}></i>标签：
                {article?.tags.map(({ name }, index) => (
                  <i key={index} className={dividerClass}>
                    {name}
                  </i>
                ))}
              </span>
            )}
          </div>
          <div
            className="markdown-body"
            dangerouslySetInnerHTML={{ __html: article.content }}
          ></div>
        </div>
        <ArticleAnchor />
      </div>
      {article.comment_flag === 1 && <Comment articeId={article.id} />}
    </div>
  )
}

export const getServerSideProps = async ({ req, params }) => {
  const { articleStore } = req.mobxStore
  const article = await articleStore.getInfoById(params?.id)
  article.content = markdownIt({
    html: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value
        } catch (error) {
          console.log(error)
        }
      }
      return null
    },
  })
    .use(markdownItAnchor)
    .render(article.content)
  return {
    props: {
      article,
    },
  }
}
