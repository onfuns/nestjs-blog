import { Button, Drawer, DrawerProps, Space } from 'antd'

export default function CustomDrawer(
  props: DrawerProps & {
    onClose: () => void
    onSubmit: () => void
    children: any
  },
) {
  return (
    <Drawer
      placement="right"
      headerStyle={{ padding: '8px 20px' }}
      width="50%"
      extra={
        <Space>
          <Button onClick={props.onClose}>取消</Button>
          <Button type="primary" onClick={props.onSubmit}>
            保存
          </Button>
        </Space>
      }
      {...props}
    >
      {props.children}
    </Drawer>
  )
}
