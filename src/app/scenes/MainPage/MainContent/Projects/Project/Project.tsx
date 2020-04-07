import * as React from 'react';
import * as dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { getSingleProject, closeProject } from 'app/redux/projects/actions';
import { IRootReducer } from 'app/redux/rootReducer';
import { Spin, Button, Modal, Drawer, Select } from 'antd';
import * as s from '../styled';
import ROUTES from 'app/routes';
import { IUsers } from 'app/types';
import { getAllUsers } from 'app/redux/auth/actions';

interface IProps extends RouteComponentProps<{ id: string}> {

}

export const Project: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const { id } = props.match.params;

  const { project, isLoading } = useSelector((state: IRootReducer) => state.project);
  const { allUsers: users } = useSelector((state: IRootReducer) => state.auth);

  const [drawerVisible, setDrawerVisible] = React.useState(false);
  const [stepsVisible, setStepsVisible] = React.useState(false);
  const [allUsers, setAllUsers] = React.useState<IUsers>([]);
  // console.log('setAllUsers: ', setAllUsers);
  console.log('allUsers: ', allUsers);
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

  React.useEffect(() => {
    setAllUsers(users!);
    return () => {}
  }, [users])

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
    console.log('id: ', id);
    const { tasks } = project!;
    console.log('tasks: ', tasks);
    const steps = tasks.filter(task => task && task.assignTo && task.assignTo.id === id);
    console.log('steps: ', steps);
    setStepsVisible(true)
  }

  const renderMembers = (members: IUsers) => {
    if (!members.length) {
      return <div>You don't have team members in this projects yet</div>
    }
    return members && members.map(member => {
      const { firstname = '', lastname = '', username = '', rankings } = member;
      const user = (firstname && lastname) ? `${firstname[0].toUpperCase()}${lastname[0].toUpperCase()}` : username[0].toUpperCase();
      // console.log('t: ', t);
      return (
        <s.User key={member.id} onClick={() => renderSteps(member.id)}>
          <s.UserAvatar>{user}</s.UserAvatar>
          <h3 style={{ marginLeft: 10 }}>{`${firstname || ''} ${lastname || ''} ${username || ''}${rankings || ''}`}</h3>
        </s.User>
      )
    })
  }

  return (
    <Spin spinning={isLoading}>
        {project ? (
          <s.ProjectContainer>
            <s.ProjectHeader>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <s.Title><a onClick={() => props.history.push(ROUTES.PROJECTS)}>Projects</a>  / {project.title}</s.Title>
                {renderStatus(project.status)}
              </div>
              <div>
                <Button type="primary">View Board</Button>
                </div>
                <div>
                  <Button
                    type="default"
                    style={{ color: 'red', border: '1px solid red' }}
                    onClick={onCloseProject}
                  >
                    Close project
                  </Button>
              </div>
            </s.ProjectHeader>
            <s.ProjectBody>
                <s.ProjectDescription>
                  <div style={{ display: 'flex', alignItems: 'baseline' }}>
                    <h3>Created by  {project.owner.username} {dayjs(+project.startDate).format('DD MMM YYYY')}
                    {project.endDate && `. Closed ${dayjs(+project.endDate).format('DD MMM YYYY')}`} </h3>
                  </div>
                  <s.Title>Description</s.Title>
                  <s.DescriptionBody title={project.shortDescription}>
                    {project.shortDescription}
                  </s.DescriptionBody>
                </s.ProjectDescription>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 20 }}>
                  <div style={{ width: '35%' }}>
                    <s.Title>Team members:</s.Title>
                    {renderMembers(project.members)}
                    <div style={{ display: 'flex', justifyContent: 'center' }} onClick={() => setDrawerVisible(true)}>
                      <Button>Add member</Button>
                    </div>
                  </div>
                  {stepsVisible && <div style={{ width: '65%' }}>
                    <s.Title>Steps</s.Title>
                  </div> }
                  
                </div>
            </s.ProjectBody>
            <Drawer
              title="Title"
              width="35%"
              placement="right"
              visible={drawerVisible}
              destroyOnClose
              onClose={() => setDrawerVisible(false)}
            >
              <Spin spinning={!allUsers.length}>
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Please select"
                // defaultValue={['a10', 'c12']}
                // onChange={handleChange}
                // options={allUsers}
              />
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