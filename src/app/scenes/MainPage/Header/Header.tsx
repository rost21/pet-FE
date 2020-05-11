import * as React from 'react';
import { useDispatch } from 'react-redux';
import { HomeFilled, ProfileFilled, UnlockFilled, UserOutlined } from '@ant-design/icons';
import { Icon } from '@ant-design/compatible';
import { Popover } from 'antd';
import { PopoverRow, HeaderContainer } from './styled';
import ROUTES from '../../../routes';
import { IProps } from './types';
import { logout } from '../../../redux/auth/actions';

// @ts-ignore
const IconHeader = props => <Icon {...props} />;

export const Header: React.FC<IProps> = props => {
  const dispatch = useDispatch();
  const popoverContent = (
    <>
      <PopoverRow onClick={() => props.replace(ROUTES.MAIN)}>
        <HomeFilled style={{ paddingRight: 10 }} />
        Dashboard
      </PopoverRow>

      <PopoverRow onClick={() => props.replace(ROUTES.PROFILE)}>
        <ProfileFilled style={{ paddingRight: 10 }} />
        My Profile
      </PopoverRow>

      <PopoverRow onClick={() => dispatch(logout())}>
        <UnlockFilled style={{ paddingRight: 10 }} />
        Logout
      </PopoverRow>
    </>
  );

  return (
    <HeaderContainer>
      <div>
        <IconHeader
          className="icons-header"
          type={props.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={props.onCollapse}
          style={{ alignSelf: 'flex-start' }}
        />
      </div>
      <div>
        <Popover placement="bottomRight" content={popoverContent} trigger="click">
          <UserOutlined className="icons-header" />
        </Popover>
      </div>
    </HeaderContainer>
  );
};
