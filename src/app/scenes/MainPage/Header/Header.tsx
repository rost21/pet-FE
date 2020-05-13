import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  HomeFilled,
  ProfileFilled, 
  UnlockFilled, 
  UserOutlined, 
  MenuFoldOutlined, 
  MenuUnfoldOutlined 
} from '@ant-design/icons';
import { Popover, Button } from 'antd';
import { PopoverRow, HeaderContainer } from './styled';
import ROUTES from '../../../routes';
import { logout } from '../../../redux/auth/actions';
import { CreateProject } from './CreateProject';
import { IRootReducer } from 'app/redux/rootReducer';
import { isCustomer } from 'app/utils/projects';

interface IProps {
  collapsed: boolean;
  onCollapse: () => void;
  redirectTo: (path: string) => void;
}

export const Header: React.FC<IProps> = props => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: IRootReducer) => state.auth);
  const [drawerVisible, setDrawerVisible] = React.useState(false);

  const isUserCustomer = React.useMemo(() => user && isCustomer(user!), [user]);

  const popoverContent = (
    <>
      <PopoverRow onClick={() => props.redirectTo(ROUTES.MAIN)}>
        <HomeFilled style={{ paddingRight: 10 }} />
        Dashboard
      </PopoverRow>

      <PopoverRow onClick={() => props.redirectTo(ROUTES.PROFILE)}>
        <ProfileFilled style={{ paddingRight: 10 }} />
        My Profile
      </PopoverRow>

      <PopoverRow onClick={() => dispatch(logout())}>
        <UnlockFilled style={{ paddingRight: 10 }} />
        Logout
      </PopoverRow>
    </>
  );

  const iconStyle = { fontSize: 25 };

  return (
    <HeaderContainer>
      <div style={{ display: 'flex', alignItems: 'center', width: 170, justifyContent: 'space-between' }}>
        {
          props.collapsed ? 
            <MenuUnfoldOutlined
              style={iconStyle}
              onClick={props.onCollapse}
            /> : 
            <MenuFoldOutlined 
              onClick={props.onCollapse} 
              style={iconStyle} 
            />
        }
        {isUserCustomer && <Button type="primary" onClick={() => setDrawerVisible(true)}>
          Create Project
        </Button>}
      </div>
      <div>
        <Popover placement="bottomRight" content={popoverContent} trigger="click">
          <UserOutlined style={iconStyle} />
        </Popover>
      </div>
      <CreateProject 
        drawerVisible={drawerVisible}
        setDrawerVisible={setDrawerVisible}
      />
    </HeaderContainer>
  );
};
