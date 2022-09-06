import { useEffect } from 'react'
import E from 'wangeditor'

let editor = null
export default function HTMLEditor({
  id = 'default_wangeditor',
  value = '',
  onChange,
}: {
  id?: string
  value?: string
  onChange: (args?: any) => void
}) {
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
