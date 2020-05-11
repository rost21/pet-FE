import * as React from 'react';
// @ts-ignore
import Kanban from 'react-trello';
import { RouteComponentProps } from 'react-router';
import { getSingleProject } from 'app/redux/projects/actions';
import { useDispatch, useSelector } from 'react-redux';
import { IRootReducer } from 'app/redux/rootReducer';
import { Spin, Card } from 'antd';
import { ProjectContainer, NotFoundMessage, Title } from '../styled';
import ROUTES from 'app/routes';
import { ITask } from 'app/types';

const data = {
  lanes: [
    {
      id: 'ready',
      title: 'Dev Ready',
      style: {
        width: 350,
        margin: '0px 8px 0px 0px',
      },
      cards: [] as ITask[],
    },
    {
      id: 'wip',
      title: 'Work In Progress',
      style: {
        width: 350,
        margin: '0px 8px 0px 0px',
      },
      cards: [] as ITask[],
    },
    {
      id: 'done',
      title: 'Done',
      style: {
        width: 350,
        margin: '0px 8px 0px 0px',
      },
      cards: [] as ITask[],
    },
    {
      id: 'closed',
      title: 'Verified & Closed',
      style: {
        width: 350,
        margin: '0px 8px 0px 0px',
      },
      cards: [] as ITask[],
    },
  ],
};

const MyCard = (props: any) => {
  return (
    <Card
      title={props.title}
      style={{ width: 320, marginBottom: 16 }}
      extra={props.type.toUpperCase()}
    >
      <div style={{ display: 'flex' }}>
        <div style={{ whiteSpace: 'pre-line', width: '75%' }}>{props.description}</div>
        <div>AVATAR</div>
      </div>
    </Card>
  );
};

interface IProps extends RouteComponentProps<{ id: string }> {}

export const Board: React.FC<IProps> = props => {
  const dispatch = useDispatch();
  const { id } = props.match.params;

  const [tasks, setTasks] = React.useState(data);

  const { project, isLoading } = useSelector((state: IRootReducer) => state.project);

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
      const newData = {
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

      // console.log(newData);
      setTasks(newData);
    }
  }, [project]);

  const handleEndDrag = (
    cardId: any,
    sourceLaneId: any,
    targetLaneId: any,
    position: any,
    cardDetails: any
  ) => {
    console.log('cardId: ', cardId);
    console.log('sourceLaneId: ', sourceLaneId);
    console.log('targetLaneId: ', targetLaneId);
    console.log('position: ', position);
    console.log('cardDetails: ', cardDetails);
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
            <div />
          </div>
          <Kanban
            data={tasks}
            // draggable
            laneDraggable={false}
            cardDraggable
            //editable
            cardDragClass="draggingCard"
            //laneDragClass="draggingLane"
            style={{
              backgroundColor: 'inherit',
              maxHeight: 'calc(100% - 64px)',
              overflowY: 'auto',
              padding: '8px 0px 0px 0px',
            }}
            handleDragEnd={handleEndDrag}
            components={{ Card: MyCard }}
          />
        </div>
      ) : (
        <ProjectContainer>
          <NotFoundMessage>Project is not found</NotFoundMessage>
        </ProjectContainer>
      )}
    </Spin>
  );
};
