import Anchor from '@/components/Article/Anchor'
import Comment from '@/components/Comment'
import classnames from 'classnames'
import dayjs from 'dayjs'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import markdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'
import styles from './style.module.less'

type IArticle = {
  id: string
  title: string
  content: string
  category?: { id: number; name: string }
  tags?: { id: number; name: string }[]
  created_at: string
  comment_flag: 0 | 1
}

export default function ArticleInfo({ article }: { article: IArticle }) {
  const { id, title, content, category, tags, created_at, comment_flag } = article || {}

  return (
    <div className={classnames('page-container', styles.page)}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          <div className={styles.meta}>
            <span>
              <i className="iconfont icon-shijian"></i>
              {dayjs(created_at).format('YYYY年MM月DD日')}
            </span>
            <span>
              <i className="iconfont icon-leimupinleifenleileibie"></i>分类：{category.name}
            </span>
            {tags?.length > 0 && (
              <span>
                <i className="iconfont icon-biaoqian1"></i>标签：
                {tags.map(({ name }, index) => (
                  <i key={index}>{name}</i>
                ))}
              </span>
            )}
          </div>
          <div
            className={classnames(styles.htmlContent, 'markdown-body')}
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </div>
        <Anchor />
      </div>
      {comment_flag === 1 && <Comment articeId={id} />}
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
