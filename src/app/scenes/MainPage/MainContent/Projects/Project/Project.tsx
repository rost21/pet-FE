import * as React from 'react';
import * as dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { getSingleProject, closeProject, addMembersToProject, changeProjectTitle, changeProjectDescription } from 'app/redux/projects/actions';
import { IRootReducer } from 'app/redux/rootReducer';
import { Spin, Button, Modal, Drawer, Select, List, Input, Popover } from 'antd';
import * as s from '../styled';
import ROUTES from 'app/routes';
import { IUsers, IUser } from 'app/types';
import { getAllUsers } from 'app/redux/auth/actions';
import { PROGRAMMING_LANGUAGES } from 'app/utils/constants';
import { UserSelect, SelectableRow, Item } from './styled';
import { CheckOutlined, ExclamationCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { Editable } from 'app/components/Editable';
import { isUserOwnerProject } from 'app/utils/projects';

interface IProps extends RouteComponentProps<{ id: string}> {}

interface IUserExtend extends IUser {
  isSelected: boolean;
}

export const Project: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const titleRef = React.useRef(null);
  const descriptionRef = React.useRef(null);
  const { id } = props.match.params;

  const { project, isLoading } = useSelector((state: IRootReducer) => state.project);
  const { allUsers: users, user } = useSelector((state: IRootReducer) => state.auth);

  const [drawerVisible, setDrawerVisible] = React.useState(false);
  const [stepsVisible, setStepsVisible] = React.useState(false);
  const [allDevelopers, setAllDevelopers] = React.useState<IUserExtend[]>([]);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  // console.log('setAllUsers: ', setAllUsers);
  // console.log('allUsers: ', allUsers);
  // const [tasks, setTasks] = React.useState([]);
  // console.log('project: ', project);

  React.useEffect(
    () => {
      dispatch(getSingleProject.started(id));
      dispatch(getAllUsers.started({}));
      // component will unmount
      return () => {
        dispatch(getSingleProject.done({
          params: id,
          result: null,
        }))
      };
    },
    [id]
  );

  const developers = React.useMemo(() => 
    users && users!.filter(user => !user.isCustomer).map(user => ({ ...user, isSelected: false })), [users]
  );

  React.useEffect(() => {
    setAllDevelopers(developers!);
    return () => {}
  }, [users]);

  React.useEffect(() => {
    setTitle(project ? project!.title : '');
    setDescription(project ? project!.description : '');
  }, [project]);

  const isUserOwner = React.useMemo(() => !!user && !!project && isUserOwnerProject(user!, project!), [user, project])

  const renderStatus = (status: string) => {
    switch (status) {
      case 'NOT PAID':
        return <s.TagStyled color="red">{status}</s.TagStyled>
      case 'PAID':
        return <s.TagStyled color="#87d068">{status}</s.TagStyled>
      case 'CLOSED':
        return <s.TagStyled>{status}</s.TagStyled>
      default:
        return;
    }
  }

  const onCloseProject = () => {
    return Modal.confirm({
      title: `Are you sure close project ${project!.title}?`,
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => { 
        dispatch(closeProject.started(project!.id));
        return;
      },
    });
  }

  const renderSteps = (id: string) => {
    const { tasks } = project!;
    const steps = tasks.filter(task => task && task.assignTo && task.assignTo.id === id);
    console.log('steps: ', steps);
    steps.length && setStepsVisible(true)
  }

  const renderMembers = (members: IUsers) => {
    if (!members.length) {
      return <div>You don't have team members in this projects yet</div>
    }

    return (
        <List 
          dataSource={members}
          renderItem={member => {
            return (
              <Item>
              </Item>
            )
          }}
        />
    )
    // dataSource={allDevelopers}
    //                 renderItem={user => (
    //                   <Item key={user.id} onClick={() => selectDeveloper(user.id)}>
    //                     <SelectableRow>
    //                       <Popover title={`${user.firstname} ${user.lastname}`} placement="right" content={renderUserPopover(user)}>
    //                         <span>{user.username}</span>
    //                       </Popover>                          
    //                       {user.isSelected && <CheckOutlined style={{ color: '#1890ff' }} />}
    //                     </SelectableRow>
    //                   </Item>
    //                 )}

    // return members && members.map(member => {
    //   const { firstname = '', lastname = '', username = '', rankings } = member;
    //   const user = (firstname && lastname) ? `${firstname[0].toUpperCase()}${lastname[0].toUpperCase()}` : username[0].toUpperCase();
    //   return (
    //     <s.User key={member.id} onClick={() => renderSteps(member.id)}>
    //       <s.UserAvatar>{user}</s.UserAvatar>
    //       <h3 style={{ marginLeft: 10 }}>{`${firstname || ''} ${lastname || ''} ${username || ''}${rankings || ''}`}</h3>
    //       <CloseOutlined style={{ color: 'red' }} />
    //     </s.User> 
    //   )
    // })
  }

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
  }

  const selectDeveloper = (id: string) => {
    const updatedDevelopers = allDevelopers.map(dev => {
      if (id === dev.id) {
        return { ...dev, isSelected: !dev.isSelected };
      }
      return { ...dev };
    })
    setAllDevelopers(updatedDevelopers);
  }

  const addDevelopers = () => {
    const ids = allDevelopers.filter(dev => dev.isSelected).map(dev => dev.id);
    ids.length && dispatch(addMembersToProject.started(ids));
    setDrawerVisible(false)
  }

  const onEndEditingTitle = () => {
    title !== project!.title && dispatch(changeProjectTitle.started(title));
  }

  const onEndEditingDescription = () => {
    description !== project!.description && dispatch(changeProjectDescription.started(description));
  }

  const renderUserPopover = (user: IUser) => {
    const { rankings, skills, about } = user;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', wordBreak: 'break-word', maxWidth: 150 }}>
        <span><b>Rankings:</b> {rankings || ''}</span>
        <span><b>Skills:</b> {skills.join(', ') || ''}</span>
        <span><b>About:</b> {about || ''}</span>
      </div>
    )
  }

  return (
    <Spin spinning={isLoading}>
        {project ? (
          <s.ProjectContainer>
            <s.ProjectHeader>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                  <s.Title>
                    <a onClick={() => props.history.push(ROUTES.PROJECTS)}>Projects</a>&nbsp;/&nbsp;
                  </s.Title>
                  <s.Title>
                    <Editable
                      canEdit={isUserOwner}
                      text={
                        <span 
                          style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', maxWidth: 300, display: 'block' }}
                          title={title}
                        >
                          {title}
                        </span> 
                      }
                      type="input"
                      placeholder="placeholder"
                      childRef={titleRef}
                      onEndEditing={onEndEditingTitle}
                    >
                      <Input
                        ref={titleRef}
                        type="text"
                        name="title"
                        value={title}
                        placeholder="placeholder"
                        style={{ maxWidth: 250, fontSize: 24 }}
                        size="small"
                        onChange={e => setTitle(e.target.value)}
                      />
                    </Editable>
                  </s.Title>
                {renderStatus(project.status)}
              </div>
                <Button type="primary">View Board</Button>
                {isUserOwner &&
                  <Button type="default" style={{ color: 'red', border: '1px solid red' }} onClick={onCloseProject}>
                    Close project
                </Button>}
            </s.ProjectHeader>
            <s.ProjectBody>
                <s.ProjectDescription>
                  <div style={{ display: 'flex', alignItems: 'baseline' }}>
                    <h3 style={{ fontWeight: 'normal' }}>Created by  {project.owner.username} {dayjs(+project.startDate).format('DD MMM YYYY')}
                    {project.endDate && `. Closed ${dayjs(+project.endDate).format('DD MMM YYYY')}`} </h3>
                  </div>
                  <s.Title>Description</s.Title>
                  <s.DescriptionBody title={project.description}>
                    <Editable
                      canEdit={isUserOwner}
                      text={
                        project.description ?
                        <h3 style={{ fontWeight: 'normal' }} title={description}>
                          {description}
                        </h3> : null
                      }
                      type="textarea"
                      placeholder="Start enter description"
                      childRef={descriptionRef}
                      onEndEditing={onEndEditingDescription}
                    >
                      <Input.TextArea
                        ref={descriptionRef}
                        value={description}
                        placeholder="Start enter description"
                        onChange={e => setDescription(e.target.value)}
                        autoSize={{ minRows: 2, maxRows: 4 }}
                      />
                    </Editable>
                  </s.DescriptionBody>
                </s.ProjectDescription>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 20 }}>
                  <div style={{ width: '35%' }}>
                    <s.Title>Team members:</s.Title>
                    {renderMembers(project.members)}
                    {isUserOwner &&
                    <div style={{ display: 'flex', justifyContent: 'center' }} onClick={() => setDrawerVisible(true)}>
                      <Button>Add member</Button>
                    </div>}
                  </div>
                  {stepsVisible && <div style={{ width: '65%' }}>
                    <s.Title>Steps</s.Title>
                  </div>}
                </div>
            </s.ProjectBody>
            <Drawer
              title="Add developers to project"
              width="30%"
              placement="right"
              visible={drawerVisible}
              destroyOnClose
              onClose={() => setDrawerVisible(false)}
              footer={
                <div style={{ textAlign: 'right' }}>
                  <Button onClick={addDevelopers} type="primary">
                    Add developers
                  </Button>
                </div>
              }
            >
              <Spin spinning={allDevelopers && !allDevelopers.length}>
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
                    dataSource={allDevelopers}
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
              </Spin>
            </Drawer>
          </s.ProjectContainer>
        ) : (
          <s.ProjectContainer>
            <s.NotFoundMessage>Project is not found</s.NotFoundMessage>
          </s.ProjectContainer>
        )}
    </Spin>
  )
}