import { RootState } from '@/redux/store';
import {
  AppleOutlined,
  AreaChartOutlined,
  AuditOutlined,
  BorderOutlined,
  ContactsOutlined,
  LogoutOutlined,
  MenuOutlined,
  ProductOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  SolutionOutlined,
  UserOutlined
} from '@ant-design/icons';
import cosmeLogo from '@/assets/logo/cosme_logo_2.png';
import { ConfigProvider, Layout, Menu, theme } from 'antd';
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
  const dispatch = useDispatch();
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

  const userObject = JSON.parse(helper.cookie_get('user'));
  const role = userObject.role;
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
        getItem('Management', 'management', <ContactsOutlined />, [
          getItem('Account', 'account', <SolutionOutlined />),
          getItem('Product', 'product', <ProductOutlined />),
          getItem('Brand', 'brand', <AppleOutlined />),
          getItem('Category', 'category', <MenuOutlined />),
          getItem('Order', 'order', <ShoppingCartOutlined />)
          // getItem('Category', 'category', <MenuOutlined />)
        ]),
        getItem('Settings', 'settings', <SettingOutlined />, [
          getItem('Profile', 'profile', <UserOutlined />)
        ])
        // getItem(),
      ]);
    }
    if (role == 'Manager') {
      setItems([
        // getItem("Acount", "acount", <ContactsOutlined />),
        // getItem("Request", "request", <SolutionOutlined />),
        // getItem("Session", "session", <AreaChartOutlined />),
        // getItem("Statistical", "statistical", <ContainerOutlined />, [
        //   getItem("Overview Statistics", "overviewStatistics"),
        //   getItem("Session Statistics", "sessionStatistics"),
        // ]),
        getItem('Management', 'management', <ContactsOutlined />, [
          getItem('Product', 'product', <ProductOutlined />),
          getItem('Brand', 'brand', <AppleOutlined />),
          getItem('Category', 'category', <MenuOutlined />),
          getItem('Order', 'order', <ShoppingCartOutlined />)
          // getItem('Category', 'category', <MenuOutlined />)
        ]),
        getItem('Settings', 'settings', <SettingOutlined />, [
          getItem('Profile', 'profile', <UserOutlined />)
        ])
        // getItem(),
      ]);
    }
    if (role == 'Sales Staff') {
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
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemSelectedBg: '#222020BA', // Màu nền khi active
            itemSelectedColor: '#FDCD3C', // Màu chữ khi active
            subMenuItemSelectedColor: '#7E6109FF'
          },
          Button: {
            primaryColor: '#FDCD3C',
            defaultBg: '#222020'
          }
        }
      }}
    >
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
                <Menu.SubMenu
                  key={item.key}
                  icon={item.icon}
                  title={item.label}
                >
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
          <Header
            style={{ background: colorBgContainer, boxSizing: 'border-box' }}
            className="mt-2"
          >
            <div
              style={{
                textAlign: 'center',

                position: 'relative'
              }}
              className="flex items-center justify-between px-4"
            >
              <div
                style={{
                  // position: 'absolute',
                  // left: '20px',
                  textAlign: 'left',
                  color: 'black',
                  border: 'none',
                  // borderRadius: '5px',
                  // padding: '10px 12px',
                  fontSize: '15px',
                  lineHeight: '23px'
                }}
              >
                <span>
                  Hi👋:{'  '}{' '}
                  {`${userObject?.firstName} ${userObject?.lastName}`}
                  {/* {user?.name} */}
                </span>
                <p>
                  Role:{`${userObject?.role}`}
                  {/* {getRole(user?.role)} */}
                </p>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <img
                  src={cosmeLogo}
                  alt=""
                  style={{ maxWidth: '200px' }}
                  // onClick={handleClick}
                />
                {/* <p style={{ maxWidth: '200px', marginBottom: '16px' }}>
                COMESTICS
              </p> */}
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
                    // position: 'absolute',
                    // right: '30px',
                    // top: '15px',
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
            </div>
          </Header>
          <Content
            style={{
              margin: '0 16px',
              display: 'flex',
              flexDirection: 'column'
            }}
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
    </ConfigProvider>
  );
}
