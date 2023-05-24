import classnames from 'classnames'
import { useEffect, useState } from 'react'
import styles from './style.module.scss'

export interface IProps {
  contentId: string
}
export interface IAnchorItem {
  title: string
  tagName: string
  index: number
}

export default function Anchor({ contentId }: IProps) {
  const [currentHeadingIndex, setCurrentHeadingIndex] = useState(0)
  const [anchor, setAnchor] = useState<IAnchorItem[]>([])

  const getHeadings = () => {
    return document.getElementById(contentId).querySelectorAll('h2,h3,h4,h5')
  }

  useEffect(() => {
    const headings = getHeadings()
    const observer = new IntersectionObserver(
      (entries) => {
        const io = entries[0]
        if (io.isIntersecting === true) {
          const index = Array.prototype.indexOf.call(headings, io.target)
          setCurrentHeadingIndex(index)

          //锚点区域如果高度过出现滚动条则自动滚动到可视区域
          const anchor: HTMLElement = document.querySelector('.anchor-list')
          if (anchor.offsetHeight > 600) {
            const top = (document.querySelectorAll('[data-anchor-index]')[index] as HTMLElement)
              .offsetTop
            //滚动到距离列表顶部 250 位置
            anchor.offsetParent.scrollTo({
              top: top > 580 ? top - 250 : 0,
              behavior: 'smooth',
            })
          }
        }
      },
      { threshold: [1] },
    )
    const data = []
    headings.forEach((node, index) => {
      observer.observe(node)
      data.push({ title: node.textContent, tagName: node.tagName, index })
    })
    setAnchor(data)
    return () => {
      headings.forEach((node) => observer.unobserve(node))
    }
  }, [])

  const onChange = ({ index }) => {
    const headings = getHeadings()
    setCurrentHeadingIndex(index)
    headings[index].scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="sticky top-60 w-260 ml-20 min-h-300 max-h-600 overflow-auto p-20 bg-#fff rd-4 flex-shrink-0 flex-self-start ">
      <ul className="anchor-list">
        {anchor.map((item, index) => (
          <li
            key={index}
            data-anchor-index={item.index}
            className={classnames(styles.anchorItem, `${item.tagName}`, {
              active: currentHeadingIndex === index,
            })}
          >
            <a
              onClick={() => onChange(item)}
              className="color-inherit relative block p-[4px_0_4px_15px]"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
