import { useEffect } from 'react'
import { default as MonacoEditor, loader } from '@monaco-editor/react'
import prettier from 'prettier/standalone'
import parserBabel from 'prettier/parser-babel'

export default ({ height = '500px', value = '', onChange }) => {
  useEffect(() => {
    Promise.all([loader.init(), import(`monaco-themes/themes/Solarized-light.json`)]).then(
      ([monaco, themeData]) => {
        monaco.editor.defineTheme('solarized-light', themeData as any)
      },
    )
  }, [])

  const handleEditorMount = (editor, monaco) => {
    editor.addAction({
      id: 'format_json',
      label: '格式化',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S], // 绑定快捷键
      contextMenuGroupId: '9_cutcopypaste',
      run: () => {
        const data = prettier.format(value, {
          parser: 'json',
          plugins: [parserBabel],
        })
        onChange(data)
      },
    })
  }

  return (
    <MonacoEditor
      height={height}
      defaultLanguage="json"
      value={value}
      onChange={onChange}
      theme="solarized-light"
      onMount={handleEditorMount}
      options={{
        tabSize: 2,
        minimap: {
          enabled: false,
        },
      }}
    />
  )
}
