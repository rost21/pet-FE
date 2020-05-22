import * as React from 'react';
import { Drawer, Button, Form, Input, List, Popover, Select } from 'antd';
// import { PROGRAMMING_LANGUAGES } from 'app/utils/constants';
import { UserSelect, Item, SelectableRow } from '../MainContent/Projects/ProjectPage/styled';
import { CheckOutlined } from '@ant-design/icons';
import { IUser } from 'app/types';
import { IUserExtend } from '../MainContent/Projects/ProjectPage/ProjectPage';
import { useSelector, useDispatch} from 'react-redux';
import { IRootReducer } from 'app/redux/rootReducer';
import { PROGRAMMING_LANGUAGES } from 'app/utils/constants';
import { createProject } from 'app/redux/project/actions';

interface IProps {
  drawerVisible: boolean;
  setDrawerVisible: (value: boolean) => void;
}

export const CreateProject: React.FC<IProps> = props => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { allUsers } = useSelector((state: IRootReducer) => state.authReducer);
  const [allDevelopers, setAllDevelopers] = React.useState<IUserExtend[]>([]);

  const developers = React.useMemo(() => 
    allUsers && allUsers!.filter(user => !user.isCustomer).map(user => ({ ...user, isSelected: false })), [allUsers]
  );
  
  React.useEffect(() => {
    setAllDevelopers(developers!);
    // component will unmount
    return () => {};
  }, [allUsers]);

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

  const onSelectDeveloper = (id: string) => {
    const updatedDevelopers = allDevelopers.map(dev => {
      if (id === dev.id) {
        return { ...dev, isSelected: !dev.isSelected };
      }
      return dev;
    });
    setAllDevelopers(updatedDevelopers);
  };

  const onFinish = async () => {
    const values = await form.validateFields();
    if (!values) {
      return;
    }
    const { title, description } = values;
    const membersIds = allDevelopers.filter(dev => dev.isSelected).map(dev => dev.id);
    props.setDrawerVisible(false);
    dispatch(createProject.started({ title, description, members: membersIds }));
  };

  return (
    <Drawer
      title="Create project"
      width="30%"
      placement="right"
      visible={props.drawerVisible}
      destroyOnClose
      onClose={() => {
        const unSelected = allDevelopers.map(user => ({ ...user, isSelected: false }));
        setAllDevelopers(unSelected);
        props.setDrawerVisible(false);
      }}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Button style={{ marginRight: 8 }} onClick={() => props.setDrawerVisible(false)} >
            Cancel
          </Button>
          <Button type="primary" onClick={() => onFinish()}>
            Create
          </Button>
        </div>
      }
    >
      <div style={{ display: 'flex' }}>
        <Form layout="vertical" style={{ width: '100%' }} form={form}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter project title' }]}
            style={{ marginBottom: 12 }}
          >
            <Input placeholder="Enter project title" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter project description' }]}
            style={{ marginBottom: 12 }}
          >
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 4 }} placeholder="Enter project description" />
          </Form.Item>

          <Form.Item
            name="members"
            label="Members"
            style={{ marginBottom: 0 }}
            // rules={[{ required: true, message: 'Please enter project description' }]}
          >
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Select languages"
              onChange={filterDevelopersByLanguage}
              size="middle"
              showSearch={false}
            >
              {PROGRAMMING_LANGUAGES.map(item => <Select.Option key={item} value={item}>{item}</Select.Option>)}
            </Select>
            <UserSelect>
              <List
                dataSource={allDevelopers}
                renderItem={user => (
                  <Item key={user.id} onClick={() => onSelectDeveloper(user.id)}>
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
          </Form.Item>
        </Form>
      </div>
    </Drawer>
  );
};