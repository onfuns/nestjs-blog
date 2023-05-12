import { getLocalUser, logoutUser } from '@/actions/user'
import AvatarImage from '@/public/images/avatar.png'
import { HeaderStore } from '@/store'
import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Dropdown } from 'antd'

export default function PageHeader({ store }: { store: HeaderStore }) {
  const { menuCollapsed, setMenuCollaps } = store
  const { userName } = getLocalUser()

  const MenuIcon = menuCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined

  return (
    <div className="flex-center h-50 py-20 border-bottom-1-solid-#f0f0f0 bg-#fff">
      <MenuIcon onClick={setMenuCollaps} className="text-size-16" />
      <Dropdown
        menu={{
          items: [
            {
              key: 'logout',
              icon: <LogoutOutlined style={{ marginRight: 5 }} />,
              label: <a onClick={logoutUser}>退出</a>,
            },
          ],
        }}
        trigger={['click']}
      >
        <a className="color-#000">
          <img src={AvatarImage} className="w-24 h-auto mr-6" />
          {userName}
        </a>
      </Dropdown>
    </div>
  )
}
