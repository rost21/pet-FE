import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Title, ProjectsContainer, ProjectsHeader } from './styled';
import { IRootReducer } from 'app/redux/rootReducer';
import { ProjectCard } from './ProjectCard';
import { Input, Spin, Select } from 'antd';
import { getAllProjects, changeFilterStatus, changeFilterSearch } from 'app/redux/project/actions';

interface IProps extends RouteComponentProps {}

export const Projects: React.FC<IProps> = props => {
  const dispatch = useDispatch();
  const { allProjects: projects, filter: { status, search }, isLoading } = useSelector((state: IRootReducer) => state.projectsReducer);

  React.useEffect(() => {
    dispatch(getAllProjects.started(''));
    // component will unmount
    return () => {};
  },  []);

  const handleChangeSearch = (e: React.FormEvent<HTMLInputElement>) => {
    const searchValue = e.currentTarget.value;
    dispatch(changeFilterSearch(searchValue));
  };

  const handleChangeView = (value: 'my' | 'all' | 'active') => {
    dispatch(changeFilterStatus(value));
  };

  return (
    <Container>
      <ProjectsHeader>
        <div>
          <Title>Projects</Title>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Select size="large" value={status} onChange={handleChangeView} style={{ width: 160, marginRight: 16 }}>
            <Select.Option value="active">Active projects</Select.Option>
            <Select.Option value="all">All projects</Select.Option>
            <Select.Option value="my">My projects</Select.Option>
          </Select>
          <Input.Search
            placeholder="Find project"
            size="large"
            style={{ width: '200px' }}
            allowClear
            value={search}
            onChange={handleChangeSearch}
          />
        </div>
      </ProjectsHeader>
      <Spin spinning={isLoading}>
        <ProjectsContainer>
          {projects && projects.length ?
            projects.map(project => <ProjectCard key={project.id} project={project} redirectTo={props.history.push} />) :
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%'
              }}>
                There are no projects
            </div>
          }
        </ProjectsContainer>
      </Spin>
    </Container>
  );
};
