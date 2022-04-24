import { useEffect } from 'react'
import E from 'wangeditor'

let editor = null
export default ({ id = 'default_wangeditor', value = '', onChange }) => {
  useEffect(() => {
    editor = new E(`#${id}`)
    editor.config.onchange = newHtml => {
      onChange(newHtml)
    }
    editor.create()
    return () => {
      editor.destroy()
    }
  }, [])

  useEffect(() => {
    if (editor) {
      editor.txt.html(value)
    }
  }, [value])

  return <div id={id}></div>
}
