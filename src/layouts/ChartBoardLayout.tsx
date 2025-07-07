import React, { useState } from 'react';
import {
  BarChartOutlined,
  FolderOutlined,
  HomeOutlined,

} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Layout, Menu, theme } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';

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
  getItem('홈', '/', <HomeOutlined />),
  getItem('컬렉션', 'sub1', <FolderOutlined />, [
    getItem('컬렉션 1', '/collection1')
  ]),
  getItem('데이터', 'sub2', <BarChartOutlined />, [
    getItem('데이터 탐색', '/dblist')
  ]),
];




const ChartBoardLayout: React.FC = () => {
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
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={handleMenuClick}/>
      </Sider>
      <Layout>
        <Header style={{ padding:"0 16px", background: colorBgContainer, display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <Link to="/">
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