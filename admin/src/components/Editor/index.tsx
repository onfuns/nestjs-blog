import { Editor } from '@bytemd/react'
import 'bytemd/dist/index.min.css'
import zh_Hans from 'bytemd/lib/locales/zh_Hans.json'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import styles from './style.less'

export default ({ value, onChange }) => {
  const modifyViewContent = () => {
    return {
      viewerEffect({ markdownBody }) {
        const heads = markdownBody.querySelectorAll('h1,h2,h3,h4,h5,h6')
        Array.from(heads).forEach((dom: HTMLElement) => {
          dom.innerHTML = `<span>${dom.innerText}</span>`
        })
      },
    }
  }
  return (
    <div className={styles.editor}>
      <Editor
        mode="split"
        locale={zh_Hans}
        value={value}
        plugins={[gfm(), highlight(), modifyViewContent()]}
        onChange={onChange}
      />
    </div>
  )
}
