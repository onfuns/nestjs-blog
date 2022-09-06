import classnames from 'classnames'
import { useState, useEffect } from 'react'
import styles from './style.module.less'

export default function Anchor() {
  const [currentHeadingIndex, setCurrentHeadingIndex] = useState(0)
  const [data, setData] = useState([])

  useEffect(() => {
    const headings = document.querySelector('.markdown-body').querySelectorAll('h1,h2,h3,h4,h5,h6')

    const observer = new IntersectionObserver(
      entries => {
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
    setData(data)
    return () => {
      headings.forEach(node => observer.unobserve(node))
    }
  }, [])

  const onChange = ({ index }) => {
    const headings = document.querySelector('.markdown-body').querySelectorAll('h1,h2,h3,h4,h5,h6')
    setCurrentHeadingIndex(index)
    headings[index].scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className={styles.anchor}>
      <ul className={classnames('anchor-list', styles.anchorList)}>
        {data.map((item, index) => (
          <li
            key={index}
            data-anchor-index={item.index}
            className={classnames({
              ['anchor-item']: true,
              [styles.anchorItem]: true,
              [styles[`${item.tagName}`]]: true,
              [styles.anchorActive]: currentHeadingIndex === index,
            })}
          >
            <a onClick={() => onChange(item)}>{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
