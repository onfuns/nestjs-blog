import { Drawer, Space, Button, DrawerProps } from 'antd'

export default (
  props: DrawerProps & {
    onClose: () => void
    onSubmit: () => void
    children: any
  },
) => (
  <Drawer
    placement="right"
    headerStyle={{ padding: '8px 20px' }}
    width="80%"
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
