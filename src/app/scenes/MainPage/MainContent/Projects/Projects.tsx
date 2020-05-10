import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {
  useSelector
  // useDispatch
} from 'react-redux';
import { Container, Title, ProjectsContainer, ProjectsHeader } from './styled';
import { IRootReducer } from 'app/redux/rootReducer';
import { ProjectCard } from './ProjectCard';
import { Input,
  Spin, Select
} from 'antd';
// import { SearchOutlined } from '@ant-design/icons';
import { debounce } from 'app/utils/common';
import { IProjects } from 'app/types';
import { 
  // findProjects,
  // changeViewProjects
} from 'app/utils/projects';

interface IProps extends RouteComponentProps {}

export const Projects: React.FC<IProps> = (props) => {
  // const dispatch = useDispatch();
  const { allProjects: projects } = useSelector((state: IRootReducer) => state.project);
  const { user } = useSelector((state: IRootReducer) => state.auth);
  const [stateProjects, setProjects] = React.useState<IProjects>([]);
  const [search, setSearch] = React.useState('');
  const [typeOfProjects, setTypeOfProjects] = React.useState('all');
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(
    () => {
      setProjects(projects);
      // component will unmount
      return () => {};
    },
    [projects]
  );

  const handleChangeSearch = (e: React.FormEvent<HTMLInputElement>) => {
    const searchValue = e.currentTarget.value;
    const type = typeOfProjects;

    setSearch(searchValue);

    debounce(() => {
      setIsLoading(true);
      debounce(() => {
        let currentList = [];

        let newList = [];
  
        if (searchValue !== '') {

          currentList = projects;
  
          newList = currentList.filter(item => {
            const title = item.title.toLowerCase();
            const filter = searchValue.toLowerCase();

            const members = item.members;
  
            if (type === 'my') {
              return members.some(member => member.id === user!.id && title.includes(filter));
            } else {
              return title.includes(filter);
            }
          });
        } else {
          if (type === 'my') {
            currentList = projects;
            newList = currentList.filter(item => item.members.some(member => member.id === user!.id));
          } else {
            newList = projects;
          }
        }
        setIsLoading(false);
        setProjects(newList);
      }, 1500);
    }, 1000);
  };

  const handleChangeView = (value: string) => {
    setTypeOfProjects(value);
    const searchValue = search;

    let currentList = [];
        
    let newList = [];

    if (value === 'my') {
      currentList = projects;

      newList = currentList.filter(item => {
        const title = item.title.toLowerCase();
        const filter = searchValue.toLowerCase();
        const lc = item.members;
        
        return lc.some(item => item.id === user!.id && title.includes(filter));
      });
    } else {
      currentList = projects;
      newList = currentList.filter(item => item.title.toLowerCase().includes(searchValue));
    }
    
    setProjects(newList);
  };

  return (
    <Container>
      <ProjectsHeader>
        <div>
          <Title>Projects</Title>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Select size="large" value={typeOfProjects} onChange={handleChangeView} style={{ width: 160, marginRight: 16 }}>
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
          {stateProjects && stateProjects.length ?
            stateProjects.map((project) => <ProjectCard key={project.id} project={project} redirectTo={props.history.push} />) :
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
