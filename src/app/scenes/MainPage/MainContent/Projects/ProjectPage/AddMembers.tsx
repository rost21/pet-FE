import * as React from 'react';
import { Drawer, Button, Select, List, Popover } from 'antd';
import { UserSelect, Item, SelectableRow } from './styled';
import { PROGRAMMING_LANGUAGES } from 'app/utils/constants';
import { CheckOutlined } from '@ant-design/icons';
import { IUser } from 'app/types';
import { IUserExtend } from './ProjectPage';
import { useSelector, useDispatch } from 'react-redux';
import { IRootReducer } from 'app/redux/rootReducer';
import { getDevelopersNotInProject } from 'app/utils/project';
import { addMembersToProject } from 'app/redux/project/actions';

interface IProps {
  drawerVisible: boolean;
  setDrawerVisible: (value: boolean) => void;
}

export const AddMembers: React.FC<IProps> = props => {
  const dispatch = useDispatch();
  const { project } = useSelector((state: IRootReducer) => state.projectsReducer);
  const { allUsers: users } = useSelector((state: IRootReducer) => state.authReducer);
  const [allDevelopers, setAllDevelopers] = React.useState<IUserExtend[]>([]);

  const developers = React.useMemo(() => 
    users && users!.filter(user => !user.isCustomer).map(user => ({ ...user, isSelected: false })), [users]
  );

  React.useEffect(() => {
    setAllDevelopers(developers!);
    // component will unmount
    return () => {};
  }, [users]);

  const developersNotInProject = React.useMemo(() => getDevelopersNotInProject(allDevelopers, project!), [allDevelopers, project]);

  const renderUserPopover = (user: IUser) => {
    const { rankings, skills, about } = user;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', wordBreak: 'break-word', maxWidth: 150 }}>
        <span><b>Rankings:</b> {rankings || ''}</span>
        <span><b>Skills:</b> {skills.join(', ') || ''}</span>
        <span><b>About:</b> {about || ''}</span>
      </div>
    );
  };

  const filterDevelopersByLanguage = (languages: string[]) => {
    if (!allDevelopers) {
      return;
    }

    const searchLanguages = languages;
    let currentList = [];
    let newList = [];

    if (searchLanguages.length) {
      currentList = developers!;
      newList = currentList.filter(user => {
          const { skills } = user;
          return skills.some(skill => searchLanguages.includes(skill));
        });
    } else {
        newList = developers!;
    }
    setAllDevelopers(newList);
  };

  const selectDeveloper = (id: string) => {
    const updatedDevelopers = allDevelopers.map(dev => {
      if (id === dev.id) {
        return { ...dev, isSelected: !dev.isSelected };
      }
      return { ...dev };
    });
    setAllDevelopers(updatedDevelopers);
  };

  const onAddMembers = () => {
    const ids = allDevelopers.filter(dev => dev.isSelected).map(dev => dev.id);
    ids.length && dispatch(addMembersToProject.started(ids));
    props.setDrawerVisible(false);
  };
  
  return (
    <Drawer
      title="Add developers to project"
      width="30%"
      placement="right"
      visible={props.drawerVisible}
      destroyOnClose
      onClose={() => {
        const unSelected = developersNotInProject!.map(dev => ({ ...dev, isSelected: false }));
        setAllDevelopers(unSelected);
        props.setDrawerVisible(false);
      }}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Button onClick={onAddMembers} type="primary">
            Add developers
          </Button>
        </div>
      }
    >
      <span>Programming languages</span>
      <Select
        mode="multiple"
        style={{ width: '100%', marginTop: 8 }}
        placeholder="Select languages"
        onChange={filterDevelopersByLanguage}
        size="middle"
        showSearch={false}
      >
        {PROGRAMMING_LANGUAGES.map(item => <Select.Option key={item} value={item}>{item}</Select.Option>)}
      </Select>
      <UserSelect>
        <List
          dataSource={developersNotInProject!}
          renderItem={user => (
            <Item key={user.id} onClick={() => selectDeveloper(user.id)}>
              <SelectableRow>
                <Popover title={`${user.firstname} ${user.lastname}`} placement="right" content={renderUserPopover(user)}>
                  <span>{user.username}</span>
                </Popover>                          
                {user.isSelected && <CheckOutlined style={{ color: '#1890ff' }} />}
              </SelectableRow>
            </Item>
          )}
        />
      </UserSelect>
    </Drawer>
  );
};