import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppstoreOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { StyledLayout, StyledHeader, StyledContent } from './styled';
import { Header } from './Header/Header';
import { ContentRouter } from './MainContent/Content';
import ROUTES from 'app/routes';
import { getUser, getAllUsers } from 'app/redux/auth/actions';
import { IRootReducer } from 'app/redux/rootReducer';
import { RouteComponentProps } from 'react-router';

const { Sider } = Layout;

interface IProps extends RouteComponentProps {}

export const MainPage: React.FC<IProps> = props => {
  const [collapsed, setCollapsed] = React.useState(false);
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: IRootReducer) => state.authReducer);

  const onCollapse = React.useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    dispatch(getUser.started({ token: token! }));
    dispatch(getAllUsers.started({}));
    // component will unmount
    return () => {};
  }, []);

  const redirectTo = (path: string) => props.history.push(path);

  const selectedKey = props.location.pathname.split('/')[2];

  return isLoggedIn ? (
    <StyledLayout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <img src="../../../assets/logo.png" width="190" height="100" />
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[selectedKey || 'main']}>
          <Menu.Item key="main" onClick={() => redirectTo(ROUTES.MAIN)}>
            <HomeOutlined />
            <span>Dashboard</span>
          </Menu.Item>
          <Menu.Item key="projects" onClick={() => redirectTo(ROUTES.PROJECTS)}>
            <AppstoreOutlined />
            <span>Projects</span>
          </Menu.Item>
          <Menu.Item key="profile" onClick={() => redirectTo(ROUTES.PROFILE)}>
            <UserOutlined />
            <span>Profile</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ overflow: 'hidden' }}>
        <StyledHeader>
          <Header
            redirectTo={props.history.push}
            collapsed={collapsed}
            onCollapse={onCollapse}
          />
        </StyledHeader>
        <StyledContent>
            <ContentRouter />
        </StyledContent>
      </Layout>
    </StyledLayout>
  ) : null;
};

