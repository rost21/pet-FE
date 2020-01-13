import * as React from 'react';
import { Icon, Popover } from 'antd';
import { connect } from 'react-redux';
import { PopoverRow, HeaderContainer } from './styled';
import ROUTES from '../../../routes';
import { IProps } from './types';
import { logout } from '../../../redux/auth/actions';

const Header: React.FC<IProps> = (props) => {
  const popoverContent = (
    <>
      <PopoverRow onClick={() => props.replace(ROUTES.MAIN)}>
        <Icon type="home" theme="filled" style={{ paddingRight: 10 }} />
        Dashboard
      </PopoverRow>

      <PopoverRow onClick={() => props.replace(ROUTES.PROFILE)}>
        <Icon type="profile" theme="filled" style={{ paddingRight: 10 }} />
        My Profile
      </PopoverRow>

      <PopoverRow onClick={props.logout}>
        <Icon type="unlock" theme="filled" style={{ paddingRight: 10 }} />
        Logout
      </PopoverRow>
    </>
  );

  return (
    <HeaderContainer>
      <div>
        <Icon
          className="icons-header"
          type={props.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={props.onCollapse}
          style={{ alignSelf: 'flex-start' }}
        />
      </div>
      <div>
        <Popover
          placement="bottomRight"
          content={popoverContent}
          trigger="click"
          className="popopopo"
        >
          <Icon className="icons-header" type="user" />
        </Popover>
      </div>
    </HeaderContainer>
  );
};

export const HeaderConnected = connect(
  null,
  (dispatch) => ({
    logout: () => dispatch(logout())
  })
)(Header);
