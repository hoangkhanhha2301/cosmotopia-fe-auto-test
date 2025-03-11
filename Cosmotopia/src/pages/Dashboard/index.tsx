import { RootState } from '@/redux/store';
import {
  AreaChartOutlined,
  AuditOutlined,
  BorderOutlined,
  ContactsOutlined,
  LogoutOutlined,
  SettingOutlined,
  SolutionOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import helper from '@/helpers/index';
import { logout } from '@/redux/auth.slice';
function getItem(label: any, key: any, icon: any, children: any) {
  return {
    key,
    icon,
    label,
    children
  };
}
export default function DashBoard() {
  const navigate = useNavigate();
  var role = helper.cookie_get('role');
  const dispatch = useDispatch();
  console.log(role);
  const { Header, Content, Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();
  // if (user?.role == "MEMBER") {
  //   navigate("/");
  // }
  const [items, setItems] = useState([]);
  const [key, setKey] = useState();
  const location = useLocation();
  const currentURI =
    location.pathname.split('/')[location.pathname.split('/').length - 1];

  const dataOpen = JSON.parse(localStorage.getItem('keys')) ?? [];

  const [openKeys, setOpenKeys] = useState(dataOpen);

  useEffect(() => {
    //   let role = null;
    //   if (userInfo != null) {
    //     const dataUserInfo = JSON.parse(userInfo);
    //     role = dataUserInfo.role;

    //     SUser.set(dataUserInfo);

    //     console.log(JSON.parse(userInfo));
    //   }

    if (role == 'Administrator') {
      setItems([
        // getItem("Acount", "acount", <ContactsOutlined />),
        // getItem("Request", "request", <SolutionOutlined />),
        // getItem("Session", "session", <AreaChartOutlined />),
        // getItem("Statistical", "statistical", <ContainerOutlined />, [
        //   getItem("Overview Statistics", "overviewStatistics"),
        //   getItem("Session Statistics", "sessionStatistics"),
        // ]),
        getItem('Management', 'management', <ContactsOutlined />, [
          getItem('Account', 'account', <SolutionOutlined />),
          getItem('Product', 'product', <AreaChartOutlined />),
          getItem('Post', 'post', <AuditOutlined />),
          getItem('Job Application', 'jobapplication', <BorderOutlined />)
        ]),
        getItem('Settings', 'settings', <SettingOutlined />, [
          getItem('Profile', 'profile', <UserOutlined />)
        ])
        // getItem(),
      ]);
    }
    if (role == '1') {
      setItems([
        getItem('Management', 'management', <ContactsOutlined />, [
          getItem('Account', 'account', <SolutionOutlined />),
          getItem('Campaign', 'campaign', <AreaChartOutlined />),
          getItem('Post', 'post', <AuditOutlined />),
          getItem('Job Application', 'jobapplication', <BorderOutlined />)
        ]),
        getItem('Settings', 'settings', <SettingOutlined />, [
          getItem('Profile', 'profile', <UserOutlined />)
        ])
      ]);
    }
    if (role == '2') {
      setItems([
        getItem('Management', 'management', <ContactsOutlined />, [
          getItem('Campaign', 'campaign', <AreaChartOutlined />),
          getItem('Post', 'post', <AuditOutlined />),
          getItem('Job Application', 'jobapplication', <BorderOutlined />)
        ]),
        getItem('Settings', 'settings', <SettingOutlined />, [
          getItem('Profile', 'profile', <UserOutlined />)
        ])
      ]);
    }
    // setItems([
    //   getItem("Account", "account", <ContactsOutlined />),
    //   getItem("Profile", "profile", <SolutionOutlined />),
    //   getItem("Campaign", "campaign", <AreaChartOutlined />),
    //   // getItem("Statistical", "statistical", <ContainerOutlined />, [
    //   //   getItem("Overview Statistics", "overviewStatistics"),
    //   //   getItem("Session Statistics", "sessionStatistics"),
    //   // ]),
    // ]);
  }, []);

  const handleSubMenuOpen = (keyMenuItem) => {
    setOpenKeys(keyMenuItem);
  };
  const handleSelectKey = (keyPath) => {
    setKey(keyPath);
  };

  useEffect(() => {
    localStorage.setItem('keys', JSON.stringify(openKeys));
  }, [openKeys]);

  useEffect(() => {
    handleSubMenuOpen([...openKeys, key]);
  }, [currentURI]);
  // const handleClick = () => {
  //   navigate("/");
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        style={{ backgroundColor: '#CDC9C9' }}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        // style={{ backgroundColor: "yellow" }}
      >
        <Menu
          style={{ backgroundColor: '#CDC9C9' }}
          defaultSelectedKeys={['profile']}
          mode="inline"
          selectedKeys={currentURI}
          openKeys={openKeys}
          onOpenChange={handleSubMenuOpen}
          // items={items}
        >
          {items.map((item) =>
            item.children ? (
              <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
                {item.children.map((subItem) => (
                  <Menu.Item
                    key={subItem.key}
                    icon={subItem.icon}
                    title={subItem.label}
                    onClick={(e) => handleSelectKey(e.keyPath[1])}
                  >
                    <Link to={`/dashboard/${subItem.key}`}>
                      {subItem.label}
                    </Link>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={`/dashboard/${item.key}`}>{item.label}</Link>
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <header
            style={{
              textAlign: 'center',
              fontSize: '32px',
              position: 'relative'
            }}
          >
            {' '}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: '20px',
                  textAlign: 'left',
                  color: 'black',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '10px 12px',
                  fontSize: '15px',
                  lineHeight: '23px'
                }}
              >
                {/* {
                  <SUser.Wrap>
                    {(user) => (
                      <>
                        <span>
                          Hi👋:{'  '} {user?.name}
                        </span>
                        <p>Role: {getRole(user?.role)}</p>
                      </>
                    )}
                  </SUser.Wrap>
                } */}
              </div>
              <img
                src="/Logo.svg"
                alt=""
                style={{ maxWidth: '200px' }}
                // onClick={handleClick}
              />
              <p style={{ maxWidth: '200px' }}> CLCA</p>
            </div>
            <div>
              <LogoutOutlined
                type="primary"
                onClick={() => {
                  helper.cookie_delete('AT');
                  dispatch(logout());
                  navigate('/');
                }}
                style={{
                  position: 'absolute',
                  right: '30px',
                  top: '15px',
                  backgroundColor: '#1677ff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '6px 12px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  height: '35px',
                  lineHeight: '23px'
                }}
              />
            </div>
          </header>
        </Header>
        <Content
          style={{ margin: '0 16px', display: 'flex', flexDirection: 'column' }}
        >
          {/* <Breadcrumb>
              {location.pathname.split("/").map((path, index, paths) => {
                const url = paths.slice(0, index + 1).join("/");
                console.log(url);
                return (
                  <Breadcrumb.Item key={path}>
                    <span to={`/${url}`}>{path}</span>
                  </Breadcrumb.Item>
                );
              })}
            </Breadcrumb> */}
          <div
            style={{
              marginTop: 24,
              padding: '24px 48px',
              marginBottom: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Outlet style={{ flexGrow: 1, display: 'flex' }} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
