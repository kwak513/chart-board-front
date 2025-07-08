import React, { useState } from 'react';
import {
  BarChartOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  FolderOutlined,
  HomeOutlined,
  IdcardOutlined,
  LayoutOutlined,
  LineChartOutlined,
  PieChartOutlined,
  UserOutlined,

} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Layout, Menu, theme } from 'antd';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;




type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('차트·대시보드', '/collection1', <BarChartOutlined />,
    [
      getItem('차트 조회', '/chartlist', <LineChartOutlined />),
      getItem('대시보드 조회', '/dashboardlist', <LayoutOutlined />),
    ]

  ),
  getItem('회원', 'sub2', <UserOutlined />, [
    getItem('DB 연결', '/dbconnect', <DatabaseOutlined />),
    getItem('마이페이지', '/mypage', <IdcardOutlined />)
  ]),
];




const ChartBoardLayout: React.FC = () => {
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  // menu 누르면 navigate
  const handleMenuClick = (e) => {
    if(e.key.startsWith("/")){
      navigate(e.key);
    }
  }

  // '+SQL 쿼리' 버튼 누르면 navigate
  const handleNewSqlClick = () => {
    navigate("/customsql");
  }

  // 로그인·회원가입 버튼 누르면 navigate
  const handleLoginClick = () => {
    navigate("/login");
  }
  // 로그아웃 버튼 누르면 navigate
  const handleLogoutClick = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userTableId');
    alert("로그아웃 되었습니다.")
    navigate('/');
  }
  
  

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={handleMenuClick} selectedKeys={[location.pathname]}/> 
        {/* url 변화에 따라 사이드바 메뉴 선택이 자동으로 되도록, selectedKeys 사용 */}
      </Sider>
      <Layout>
        <Header style={{ padding:"0 16px", background: colorBgContainer, display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <Link to="/customsql">
            <img src='/ChartBoardLogoForNav.png' alt="로고" style={{ width: 150 }} />
          </Link>
          <div>
            {!sessionStorage.getItem('isLoggedIn')?<Button onClick={handleLoginClick}>로그인·회원가입</Button>: <Button onClick={handleLogoutClick}>로그아웃</Button>}
            
            <Button type="primary" onClick={handleNewSqlClick} style={{ marginLeft: 10 }}>+ SQL 쿼리</Button>
          </div>
          
        </Header>
        <Content style={{ margin: '16px' }}>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default ChartBoardLayout;