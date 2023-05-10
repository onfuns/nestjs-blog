import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import { Editor } from '@bytemd/react'
import 'bytemd/dist/index.min.css'
import zh_Hans from 'bytemd/locales/zh_Hans.json'
import styles from './style.module.less'

export default function MDEditor({
  value,
  onChange,
}: {
  value: string
  onChange: (args?: any) => void
}) {
  const modifyViewContent = () => {
    return {
      viewerEffect() {
        console.log('viewerEffect done')
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