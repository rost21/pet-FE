import * as React from 'react';
import { KanbanBoard } from './styled';
import { RouteComponentProps } from 'react-router';
import { getSingleProject } from 'app/redux/project/actions';
import { useDispatch, useSelector } from 'react-redux';
import { IRootReducer } from 'app/redux/rootReducer';
import { Spin, Card, Button, Avatar, Tooltip } from 'antd';
import { ProjectContainer, NotFoundMessage, Title } from '../styled';
import ROUTES from 'app/routes';
import { ITask } from 'app/types';
import { CreateTask } from './CreateTask';
import { Task } from './Task';
import { isUserOwnerProject, cutString } from 'app/utils/project';
import { updateTask, setTaskModalVisible } from 'app/redux/task/actions';

const data = {
  lanes: [
    {
      id: 'ready',
      title: 'Dev Ready',
      style: {
        width: '24%',
        margin: '0px 8px 0px 0px',
      },
      cards: [] as ITask[],
    },
    {
      id: 'wip',
      title: 'Work In Progress',
      style: {
        width: '24%',
        margin: '0px 8px 0px 0px',
      },
      cards: [] as ITask[],
    },
    {
      id: 'done',
      title: 'Done',
      style: {
        width: '24%',
        margin: '0px 8px 0px 0px',
      },
      cards: [] as ITask[],
    },
    {
      id: 'closed',
      title: 'Verified & Closed',
      style: {
        width: '24%',
        margin: '0px 8px 0px 0px',
      },
      cards: [] as ITask[],
    },
  ],
};

interface IProps extends RouteComponentProps<{ id: string }> {}

export const Board: React.FC<IProps> = props => {
  const dispatch = useDispatch();
  const { id } = props.match.params;

  const [tasks, setTasks] = React.useState(data);
  const [drawerVisible, setDrawerVisible] = React.useState(false);
  
  const { project, isLoading } = useSelector((state: IRootReducer) => state.projectsReducer);
  const { selectedTaskId } = useSelector((state: IRootReducer) => state.tasksReducer);
  const { user } = useSelector((state: IRootReducer) => state.authReducer);

  React.useEffect(() => {
    dispatch(getSingleProject.started(id));
    // component will unmount
    return () => {
      dispatch(
        getSingleProject.done({
          params: id,
          result: null,
        })
      );
    };
  }, [id]);

  React.useEffect(() => {
    if (project) {
      const tasks = {
        ...data,
        lanes: data.lanes.map(item => ({
          ...item,
          cards: project.tasks.reduce((acc: ITask[], task) => {
            if (task.status === item.id) {
              return [...acc, task];
            }
            return [...acc];
          }, []),
        })),
      };

      setTasks(tasks);
    }
  }, [project]);

  const isOwner = React.useMemo(() => project && isUserOwnerProject(user!, project!), [user, project]);

  const handleEndDrag = (cardId: string, sourceLaneId: string, targetLaneId: string) => {
    if (sourceLaneId === targetLaneId) {
      return;
    }

    dispatch(updateTask.started({ id: cardId, payload: { status: targetLaneId } }));
  };

  const renderCard = (task: ITask) => {
    const { id = '', title = '', type = '', description = '', assignTo } = task;

    return (
      <Card
        key={id}
        title={title}
        style={{ marginBottom: 2 }}
        extra={type.toUpperCase()}
        onClick={() => dispatch(setTaskModalVisible({ visible: true, id }))}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ whiteSpace: 'pre-line', wordBreak: 'break-all', maxWidth: '83%' }}>
            {cutString(description, 250)}
          </div>
          {!!assignTo && 
            <Tooltip title={assignTo.firstname + ' ' + assignTo.lastname}>
              <Avatar>
                {(assignTo.firstname && (assignTo.firstname[0].toUpperCase() + '' + assignTo.lastname[0].toUpperCase())) || assignTo.username[0].toUpperCase()}
              </Avatar>
            </Tooltip>
          }
        </div>
      </Card>
    );
  };

  return (
    <Spin spinning={isLoading}>
      {project ? (
        <div style={{ height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Title>
              <a onClick={() => props.history.push(ROUTES.PROJECTS)}>Projects</a>&nbsp;/&nbsp;
              <a onClick={() => props.history.push(`/main/projects/${project.id}`)}>
                {project.title}
              </a>
            </Title>
            <Title>Board</Title>
            <div />
            {isOwner ? <Button onClick={() => setDrawerVisible(true)}>
              Create task
            </Button> : <div />}
          </div>
          <KanbanBoard
            data={tasks}
            laneDraggable={false}
            cardDraggable
            cardDragClass="draggingCard"
            handleDragEnd={handleEndDrag}
            components={{ Card: renderCard }}
          />
          <CreateTask 
            drawerVisible={drawerVisible} 
            setDrawerVisible={setDrawerVisible} 
          />
          {selectedTaskId && <Task />}
        </div>
      ) : (
        <ProjectContainer>
          <NotFoundMessage>Project is not found</NotFoundMessage>
        </ProjectContainer>
      )}
    </Spin>
  );
};
