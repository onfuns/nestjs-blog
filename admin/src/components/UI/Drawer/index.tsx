import { Drawer, Space, Button, DrawerProps } from 'antd'

type IProps = DrawerProps & {
  onCancel?: () => void
  onSubmit?: () => void
  children: any
}

export default (props: IProps) => (
  <Drawer
    placement="right"
    headerStyle={{ padding: '8px 20px' }}
    width="80%"
    extra={
      <Space>
        <Button onClick={props.onCancel}>取消</Button>
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
