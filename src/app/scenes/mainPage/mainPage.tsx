import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Menu, Icon } from 'antd';
import { StyledLayout, StyledHeader, StyledContent } from './styled';
import { HeaderConnected as HeaderComponent } from './header/header';
import { ContentRouter } from './mainContent/content';
import ROUTES from 'app/routes';
import { getUser } from 'app/redux/auth/actions';
import { IProps } from './types';
import { isLoggedIn as isLoggedInSelector } from 'app/redux/auth/selectors';

const { Sider } = Layout;

export const MainPage: React.FC<IProps> = (props) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(isLoggedInSelector)
  
  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    dispatch(getUser.started({ token: token! }));
    // component will unmount
    return () => {};
  }, []);

  const redirectTo = (path: string) => props.history.push(path);

  const selectedKey = props.location.pathname.split('/')[2];

  return isLoggedIn ? (
    <StyledLayout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">Project</div>
        <Menu theme="dark" mode="inline" selectedKeys={[selectedKey || 'main']}>
          <Menu.Item key="main" onClick={() => redirectTo(ROUTES.MAIN)}>
            <Icon type="home" />
            <span>Dashboard</span>
          </Menu.Item>
          <Menu.Item key="projects" onClick={() => redirectTo(ROUTES.PROJECTS)}>
            <Icon type="appstore" />
            <span>Projects</span>
          </Menu.Item>
          <Menu.Item key="profile" onClick={() => redirectTo(ROUTES.PROFILE)}>
            <Icon type="user" />
            <span>Profile</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <StyledHeader>
          <HeaderComponent
            replace={props.history.push}
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

