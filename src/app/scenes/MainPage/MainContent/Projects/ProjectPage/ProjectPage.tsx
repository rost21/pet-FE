import * as React from 'react';
import * as dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import {
  getSingleProject,
  closeProject,
  changeProjectTitle,
  changeProjectDescription,
  deleteUserFromMembers
} from 'app/redux/project/actions';
import { IRootReducer } from 'app/redux/rootReducer';
import { Spin, Button, Modal, List, Input } from 'antd';
import * as s from '../styled';
import ROUTES from 'app/routes';
import { IUsers, IUser } from 'app/types';
import { ExclamationCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { Editable } from 'app/components/Editable';
import { isUserOwnerProject, isProjectClosed, isUserMemberProject } from 'app/utils/project';
import { AddMembers } from './AddMembers';
import { Item } from './styled';
import { formattingDescription } from 'app/utils/task';

interface IProps extends RouteComponentProps<{ id: string }> {}

export interface IUserExtend extends IUser {
  isSelected: boolean;
}

export const ProjectPage: React.FC<IProps> = props => {
  const dispatch = useDispatch();
  const titleRef = React.useRef(null);
  const descriptionRef = React.useRef(null);
  const { id } = props.match.params;

  const { project, isLoading } = useSelector((state: IRootReducer) => state.projectsReducer);
  const { user } = useSelector((state: IRootReducer) => state.authReducer);

  const [drawerVisible, setDrawerVisible] = React.useState(false);
  const [stepsVisible, setStepsVisible] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
      dispatch(getSingleProject.started(id));
      // component will unmount
      return () => {
        dispatch(getSingleProject.done({
          params: id,
          result: null,
        }));
      };
    }, [id]
  );

  React.useEffect(() => {
    setTitle(project ? project.title : '');
    setDescription(project ? project.description : '');
  }, [project]);

  const isUserOwner = React.useMemo(() => !!user && !!project && isUserOwnerProject(user, project), [user, project]);
  const isMember = React.useMemo(() => !!user && !!project && isUserMemberProject(user!, project!), [user, project]);

  const renderStatus = (status: string) => {
    switch (status) {
      case 'NOT PAID':
        return <s.TagStyled color="red">{status}</s.TagStyled>;
      case 'PAID':
        return <s.TagStyled color="#87d068">{status}</s.TagStyled>;
      case 'CLOSED':
        return <s.TagStyled>{status}</s.TagStyled>;
      default:
        return;
    }
  };

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
  };

  const renderSteps = (id: string) => {
    const { tasks } = project!;
    const steps = tasks.filter(task => task && task.assignTo && task.assignTo.id === id);
    console.log('steps: ', steps);
    steps.length && setStepsVisible(true);
  };

  const onDeleteMember = (id: string) => {
    dispatch(deleteUserFromMembers.started(id));
  };

  const renderMembers = (members: IUsers) => {
    if (!members.length) {
      return <div>You don't have team members in this projects yet</div>;
    }

    return (
      <List
        style={{ maxHeight: '100%', overflowY: 'auto' }}
        dataSource={members}
        renderItem={member => {
          const { firstname = '', lastname = '', rankings } = member;
          const user = `${firstname[0].toUpperCase()}${lastname[0].toUpperCase()}`;
          return (
            <Item key={member.id} onClick={() => renderSteps(member.id)}>
              <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <s.UserAvatar>{user}</s.UserAvatar>
                  <h3 style={{ marginLeft: 10 }}>{`${firstname || ''} ${lastname || ''} ${rankings || ''}`}</h3>
                </div>
                {isUserOwner && <CloseOutlined style={{ color: 'red' }} onClick={() => onDeleteMember(member.id)} />}
              </div>
            </Item> 
          );
        }}
      />
    );
  };

  const onEndEditingTitle = () => {
    title !== project!.title && dispatch(changeProjectTitle.started(title));
  };

  const onEndEditingDescription = () => {
    description !== project!.description && dispatch(changeProjectDescription.started(description));
  };

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
                    canEdit={isUserOwner && !isProjectClosed(project)}
                    text={
                      <span 
                        style={{ 
                          overflow: 'hidden', 
                          whiteSpace: 'nowrap', 
                          textOverflow: 'ellipsis', 
                          maxWidth: 300, 
                          display: 'block' 
                        }}
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
              {(isUserOwner || isMember) && <Button
                type="primary"
                onClick={() => props.history.push(`/main/projects/${project.id}/board`)}
              >
                View Board
              </Button>}
              {
                isUserOwner && !isProjectClosed(project) ?
                <Button type="default" style={{ color: 'red', border: '1px solid red' }} onClick={onCloseProject}>
                  Close project
                </Button> : (<><div /> <div /></>)
              }
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
                      canEdit={isUserOwner && !isProjectClosed(project)}
                      text={formattingDescription(description)}
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
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', maxHeight: '75%', paddingTop: 20 }}>
                  <div style={{ width: '30%', height: '100%' }}>
                    <s.Title>Team members:</s.Title>
                    {renderMembers(project.members)}
                    {isUserOwner && !isProjectClosed(project) &&
                    <div style={{ display: 'flex', justifyContent: 'center' }} onClick={() => setDrawerVisible(true)}>
                      <Button>Add member</Button>
                    </div>}
                  </div>
                  {stepsVisible && 
                    <div style={{ width: '70%' }}>
                      <s.Title>Steps</s.Title>
                    </div>
                  }
                </div>
            </s.ProjectBody>
            <AddMembers
              drawerVisible={drawerVisible}
              setDrawerVisible={setDrawerVisible}
            />
          </s.ProjectContainer>
        ) : (
          <s.ProjectContainer>
            <s.NotFoundMessage>Project is not found</s.NotFoundMessage>
          </s.ProjectContainer>
        )}
    </Spin>
  );
};