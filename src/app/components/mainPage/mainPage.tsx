import * as React from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Icon } from 'antd';
import { StyledLayout } from './styled';
import { HeaderConnected as HeaderComponent } from './header/header';
import { ContentRouter } from './mainContent/content';
import { RouteComponentProps } from 'react-router';
import ROUTES from '../../routes';

const { Header, Sider, Content } = Layout;

interface IProps extends RouteComponentProps {}

const MainPage: React.FC<IProps> = (props) => {
  const [collapsed, setCollapsed] = React.useState(false);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  const redirectTo = (path: string) => props.history.push(path);

  const selectedKey = props.location.pathname.split('/')[2];

  return (
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
        <Header
          style={{
            backgroundColor: '#fff',
            padding: '0 20px',
            lineHeight: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <HeaderComponent
            replace={props.history.push}
            collapsed={collapsed}
            onCollapse={onCollapse}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: '#fff',
            minHeight: 280,
            display: 'flex'
          }}
        >
          <ContentRouter />
        </Content>
      </Layout>
    </StyledLayout>
  );
};

export const MainPageConnected = connect(
  // (state) => {
  //   const comeFrom =
  //     get(
  //       state.modals.openedModalWindows.find(
  //         m => m.type === ModalTypes.MOBILE_FULL_SCREEN_VIEW_ACTIONS
  //       ),
  //       'extra.comeFrom'
  //     ) || ''
  //   return {
  //     isAuthenticated: state.auth.isLoggedIn,
  //     publicImage: isReportEnabled(state) ? state.search.selectedImageId : '',
  //     comeFrom
  //   }
  // },
  null,
  // (dispatch) => ({
  //   login: (value: string) => dispatch(actions.setText(value))
  // })
  null
)(MainPage);
