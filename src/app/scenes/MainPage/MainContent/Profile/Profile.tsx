import * as React from 'react';
import { Container, Title, ProfileHeader, ProfileContainer } from './styled';
import { useSelector, useDispatch } from 'react-redux';
import { IRootReducer } from 'app/redux/rootReducer';
import { LocationIcon } from '../../../../../assets/Icons/Location';
import { Rate, Tabs, Input, Button } from 'antd';
import { About } from './About';
import { Timeline } from './Timeline';
import { Tab } from 'app/types';
import { changeActiveTab, toggleEditMode, updateUser } from 'app/redux/auth/actions';
import { Editable } from 'app/components/Editable';
import { showNotification } from 'app/utils/notifications';
import { EditOutlined } from '@ant-design/icons';

export const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const { user, activeTab, editMode } = useSelector((state: IRootReducer) => state.authReducer);

  const [firstname, setFirstname] = React.useState(user!.firstname);
  const [lastname, setLastname] = React.useState(user!.lastname);
  const [location, setLocation] = React.useState(user!.location);
  const [role, setRole] = React.useState(user!.role);

  const firstnameRef = React.useRef(null);
  const lastnameRef = React.useRef(null);
  const locationRef = React.useRef(null);
  const roleRef = React.useRef(null);

  React.useEffect(() => {
    return () => {
      dispatch(toggleEditMode(false));
    };
  }, []);

  const handleChangeTab = (activeKey: string) => {
    dispatch(changeActiveTab(activeKey as Tab));
  };

  const onToggleEditMode = () => {
    dispatch(toggleEditMode(!editMode));
    showNotification(`${editMode ? 'Edit mode disabled' : 'Edit mode enabled'}`, 'info');
  };

  const onChangeFirstname = () => {
    dispatch(updateUser.started({ firstname }));
  };

  const onChangeLastname = () => {
    dispatch(updateUser.started({ lastname }));
  };

  const onChangeLocation = () => {
    dispatch(updateUser.started({ location }));
  };

  const onChangeRole = () => {
    dispatch(updateUser.started({ role }));
  };

  return (
    <Container>
      <ProfileHeader>
        <Title>Profile</Title>
        <Button type={editMode ? 'primary' : 'dashed'} onClick={onToggleEditMode}>Edit mode <EditOutlined /></Button>
      </ProfileHeader>
      <ProfileContainer>
        <div style={{ width: '30%' }}></div>
        <div style={{ width: '70%' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
            <Editable
              childRef={firstnameRef}
              canEdit={editMode}
              type="input"
              placeholder="Firstname"
              text={
                <h3 style={{ fontSize: 24, margin: 0 }}>{user!.firstname}</h3>
              }
              onEndEditing={onChangeFirstname}
            >
              <Input
                ref={firstnameRef}
                type="text"
                name="firstname"
                value={firstname}
                style={{ maxWidth: 100, fontSize: 18 }}
                size="small"
                onChange={e => setFirstname(e.target.value)}
              />
            </Editable>
            {' '} &nbsp;
            <Editable
              childRef={lastnameRef}
              canEdit={editMode}
              type="input"
              placeholder="Lastname"
              text={
                <h3 style={{ fontSize: 24, margin: 0 }}>{user!.lastname}</h3>
              }
              onEndEditing={onChangeLastname}
            >
              <Input
                ref={lastnameRef}
                type="text"
                name="lastname"
                value={lastname}
                style={{ maxWidth: 100, fontSize: 18 }}
                size="small"
                onChange={e => setLastname(e.target.value)}
              />
            </Editable>
            <span style={{ marginLeft: 16 }}><LocationIcon /></span>
            <Editable
              childRef={locationRef}
              canEdit={editMode}
              type="input"
              placeholder="N/A"
              text={user!.location}
              onEndEditing={onChangeLocation}
            >
              <Input
                ref={locationRef}
                type="text"
                name="location"
                value={location}
                style={{ maxWidth: 100, fontSize: 16 }}
                size="small"
                onChange={e => setLocation(e.target.value)}
              />
            </Editable>
          </div>
          <div style={{ marginBottom: 24 }}>
            <Editable
              childRef={roleRef}
              canEdit={editMode}
              type="input"
              placeholder="N/A"
              text={<h3 style={{ color: '#00A6FF' }}>{user!.role}</h3>}
              onEndEditing={onChangeRole}
            >
              <Input
                ref={roleRef}
                type="text"
                name="role"
                value={role}
                style={{ maxWidth: 'max-content', fontSize: 16 }}
                size="small"
                onChange={e => setRole(e.target.value)}
              />
            </Editable>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 16 }}>
              <h4 style={{ margin: 0 }}>Rankings</h4>
              <div style={{ display: 'flex' }}>
                <h2>{7}</h2>
                <Rate allowHalf disabled value={7/2} style={{ color: '#00A6FF', marginLeft: 8 }} />
              </div>
          </div>
          <div style={{ width: '40%' }}>
            <Tabs activeKey={activeTab} size="large" onChange={handleChangeTab}>
              <Tabs.TabPane tab="Timeline" key="timeline">
                <Timeline />
              </Tabs.TabPane>
              <Tabs.TabPane tab="About" key="about">
                <About />
              </Tabs.TabPane>
            </Tabs>
          </div>
        </div>
      </ProfileContainer>
    </Container>
  );
};
