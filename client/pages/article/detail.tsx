import markdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'
import styles from './detail.module.less'
import classnames from 'classnames'
import Anchor from '@/components/Article/Anchor'
import Comment from '@/components/Comment'
import { parseHtml } from '@/utils/dom'
import dayjs from 'dayjs'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

const ArticleDetail = ({ detail }) => {
  const { id, title, content, category, tags, created_at, comment_flag } = detail || {}
  const { anchor, html } = parseHtml(content)

  return (
    <div className={classnames('container', styles.detailPage)}>
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
            {tags?.length ? (
              <span>
                <i className="iconfont icon-biaoqian1"></i>标签：
                {tags.map(({ name }, index) => (
                  <i key={index}>{name}</i>
                ))}
              </span>
            ) : null}
          </div>
          <div
            className={classnames(styles.htmlContent, 'markdown-body')}
            dangerouslySetInnerHTML={{ __html: html }}
          ></div>
        </div>
        <Anchor list={anchor} />
      </div>
      {comment_flag === 1 && <Comment articeId={id} />}
    </div>
  )
}

export const getServerSideProps = async ({ req }) => {
  const { articleStore } = req.mobxStore
  await articleStore.getInfoById({
    id: req.params.id,
  })
  const detail = articleStore.detail
  detail.content = markdownIt({
    html: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value
        } catch (error) {
          console.log(error)
        }
      }
      return ''
    },
  })
    .use(markdownItAnchor)
    .render(detail.content)
  return {
    props: {
      detail,
    },
  }
}

export default ArticleDetail
