import * as React from 'react';
// import * as dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { getSingleProject, closeProject } from 'app/redux/projects/actions';
import { IRootReducer } from 'app/redux/rootReducer';
import { Spin, Button, Modal } from 'antd';
import * as s from '../styled';
import ROUTES from 'app/routes';
import { IUsers } from 'app/types';

interface IProps extends RouteComponentProps<{ id: string}> {

}

export const Project: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const { id } = props.match.params;
  const { project, isLoading } = useSelector((state: IRootReducer) => state.project);
  // console.log('project: ', project);

  React.useEffect(
    () => {
      dispatch(getSingleProject.started(id))
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

  const renderMember = (members: IUsers) => {
    return members && members.map(member => {
      const { firstname, lastname, username, rankings } = member;
      const t = (firstname && lastname) ? `${firstname[0].toUpperCase()} ${lastname[0].toUpperCase()}` : username[0].toUpperCase();
      console.log('t: ', t);
      return (
        <div style={{ display: 'flex', alignItems: 'center', paddingTop: 5 }}>
          <s.UserAvatar>{t}</s.UserAvatar>
          <h3 style={{ marginLeft: 10 }}>{`${firstname} ${lastname} ${rankings}`}</h3>
        </div>
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
                  <s.Title>Description</s.Title>
                  <s.DescriptionBody title={project.shortDescription}>
                    {project.shortDescription}
                  </s.DescriptionBody>
                </s.ProjectDescription>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 20 }}>
                  <div style={{ width: '50%', border: '1px solid' }}>
                    <s.Title>Team members:</s.Title>
                    {/* {`${project.owner.firstname} ${project.owner.lastname}`} Owner */}
                    {renderMember(project.members)}
                  </div>
                  <div style={{ width: '50%', border: '1px solid' }}>
                    <s.Title>Steps</s.Title>
                  </div>
                </div>
            </s.ProjectBody>
          </s.ProjectContainer>
        ) : (
          <s.ProjectContainer>
            <s.NotFoundMessage>Project is not found</s.NotFoundMessage>
          </s.ProjectContainer>
        )}
    </Spin>
  )
}