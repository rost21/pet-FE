import * as React from 'react';
import * as dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { IRootReducer } from 'app/redux/rootReducer';
import { Modal } from './styled';
import { setTaskModalVisible, getSingleTask, updateTask, createComment } from 'app/redux/task/actions';
import { Spin, Input, Tooltip, Popover, Select, Avatar, Comment, Form, Button, List } from 'antd';
import { Title, DescriptionBody } from '../styled';
import { Editable } from 'app/components/Editable';
import { isUserOwnerProject } from 'app/utils/project';
import { ImprovementIcon } from '../../../../../../assets/Icons/Improvement';
import { StoryIcon } from '../../../../../../assets/Icons/Story';
import { BugIcon } from '../../../../../../assets/Icons/Bug';
import { ITask, IComment } from 'app/types';
import { PopoverRow } from 'app/scenes/MainPage/Header/styled';
import { ALL_TYPES } from 'app/utils/constants';
import { UserOutlined } from '@ant-design/icons';
import { formattingByNewLine } from 'app/utils/task';
import { generateColor } from 'app/utils/common';

const CommentList = ({ comments }: { comments: IComment[] }) => {
  const color = generateColor();
  return (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
      renderItem={props => 
        <Comment 
          key={props.id}
          content={<p>{props.comment}</p>} 
          author={props.author.firstname + ' ' + props.author.lastname}
          datetime={dayjs(+props.postedDate).format('DD MMM YYYY, HH:mm')}
          avatar={<Avatar style={{ backgroundColor: color }}>{props.author.firstname[0].toUpperCase() + '' + props.author.lastname[0].toUpperCase()}</Avatar>}
        />}
    />
  );
};

interface IEditorProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  loading: boolean;
}

const Editor = ({ loading, onChange, onSubmit, value }: IEditorProps) => (
  <div>
    <Form.Item>
      <Input.TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" onClick={onSubmit} type="primary" loading={loading}>
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

export const Task = () => {
  const dispatch = useDispatch();
  const { isTaskModalVisible, selectedTaskId, isLoading, task } = useSelector((state: IRootReducer) => state.tasksReducer);
  const { project } = useSelector((state: IRootReducer) => state.projectsReducer);

  const { user } = useSelector((state: IRootReducer) => state.authReducer);

  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [assignTo, setAssignTo] = React.useState('');
  const [commentValue, setCommentValue] = React.useState('');

  const titleRef = React.useRef(null);
  const descriptionRef = React.useRef(null);
  const assignToRef = React.useRef(null);

  React.useEffect(() => {
    dispatch(getSingleTask.started(selectedTaskId));
    // component will unmount
    return () => {};
  }, [selectedTaskId]);

  React.useEffect(() => {
    setTitle(task ? task.title : '');
    setDescription(task ? task.description : '');
    setStatus(task ? task.status : '');
    setAssignTo(task && task.assignTo ? task.assignTo.id : '');
  }, [task]);

  const isOwner = React.useMemo(() => project && isUserOwnerProject(user!, project!), [user, project]);
  const isAssigned = React.useMemo(() => task && task!.assignTo.id === user!.id, [user, task]);

  const renderIcon = (type: 'bug' | 'story' | 'improvement') => {
    if (!type) {
      return null;
    }
    switch (type.toLowerCase()) {
      case 'bug':
        return <BugIcon />;
      case 'story':
        return <StoryIcon />;
      case 'improvement':
        return <ImprovementIcon />;
      default:
        return;
    }
  };

  const handleChangeTitle = () => {
    if (title !== task!.title) {
      dispatch(updateTask.started({
        id: selectedTaskId, payload: { title }
      }));
    }
  };

  const handleChangeDescription = () => {
    if (description !== task!.description) {
      dispatch(updateTask.started({
          id: selectedTaskId, payload: { description }
      }));
    }
  };

  const handleChangeType = (type: string) => {
    dispatch(updateTask.started({ 
        id: selectedTaskId, payload: { type: type.toLowerCase() }
    }));
  };

  const handleChangeStatus = (status: string) => {
    setStatus(status);
    setTimeout(() => {
      dispatch(updateTask.started({ 
        id: selectedTaskId, payload: { status: status }
      }));
    }, 500);
  };

  const handleSelectAssignee = (id: string) => {
    setAssignTo(id);
    setTimeout(() => {
      dispatch(updateTask.started({ 
        id: selectedTaskId, payload: { assignTo: id }
      }));
    }, 500);
  };

  const handleAddComment = () => {
    dispatch(createComment.started({
      author: user!.id,
      comment: commentValue,
    }));
    setCommentValue('');
  };

  const popoverContent = (
    <>
      <span>Change task type</span>
      <div style={{ marginTop: 4 }}>
        {task && ALL_TYPES.map((type, index) => (
            <PopoverRow
              disabled={type.toLowerCase() === task.type}
              key={index}
              style={{ display: 'flex', alignItems: 'center', padding: '2px 0' }} 
              onClick={() => type.toLowerCase() !== task.type && handleChangeType(type)}
            >
              <span style={{ display: 'flex', marginRight: 4 }}>{renderIcon(type as ITask['type'])}</span>
              {type}
            </PopoverRow>
          ))}
      </div>
    </>
  );
  
  const renderTitle = 
    <div style={{ display: 'flex', alignItems: 'center' }}>
      Task {task ? task.title : ''}
      {task && 
        <Popover placement="bottomLeft" content={popoverContent} trigger="click">
          <Tooltip title='Click to change type of task'>
            <span style={{ display: 'flex', marginLeft: 8, cursor: 'pointer' }}>
              {renderIcon(task!.type)}
            </span>
          </Tooltip>
        </Popover>}
    </div>;

  const color = React.useMemo(() => generateColor(), [project]);

  return (
    <Modal
      visible={isTaskModalVisible}
      title={renderTitle}
      width="80%"
      destroyOnClose
      footer={null}
      onCancel={() => {
        dispatch(setTaskModalVisible({ visible: false, id: '' }));
        dispatch(getSingleTask.done({ params: '', result: null }));
      }}
    >
      <Spin spinning={isLoading}>
        {
          task ? 
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ maxWidth: '75%', width: '75%', paddingRight: 8 }}>
                <div style={{ marginBottom: 24 }}>
                  <Title>
                    <Editable
                      canEdit={isOwner!}
                      text={<span>{title}</span>}
                      type="input"
                      placeholder="placeholder"
                      childRef={titleRef}
                      onEndEditing={handleChangeTitle}
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
                  </Title>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <Title style={{ fontSize: 16 }}>Description</Title>
                  <DescriptionBody title={task.description}>
                    <Editable
                      canEdit={isOwner!}
                      text={formattingByNewLine(task.description)}
                      type="textarea"
                      placeholder="Start enter description"
                      childRef={descriptionRef}
                      onEndEditing={handleChangeDescription}
                    >
                      <Input.TextArea
                        ref={descriptionRef}
                        value={description}
                        placeholder="Start enter description"
                        onChange={e => setDescription(e.target.value)}
                        autoSize={{ minRows: 4 }}
                      />
                    </Editable>
                  </DescriptionBody>
                </div>
                <div>
                  {task.comments.length > 0 && <CommentList comments={task.comments} />}
                  <Comment
                    avatar={<Avatar>{user!.firstname[0].toUpperCase() + '' + user!.lastname[0].toUpperCase()}</Avatar>}
                    content={
                      <Editor
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCommentValue(e.target.value)}
                        onSubmit={handleAddComment}
                        value={commentValue}
                        loading={isLoading}
                      />
                    }
                  />
                </div>
              </div>
              <div style={{ width: '25%', padding: '0 8px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: 16 }}>
                  <Select value={status} size="large" onChange={handleChangeStatus} style={{ width: 200 }} disabled={!isOwner && !isAssigned}>
                    <Select.Option value="ready">Dev ready</Select.Option>
                    <Select.Option value="wip">Dev in progress</Select.Option>
                    <Select.Option value="done">Done</Select.Option>
                    <Select.Option value="closed">Verified and closed</Select.Option>
                  </Select>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <h4 style={{ margin: 0, fontSize: 14 }}>Assignee</h4>
                  <div>
                    <Editable
                      canEdit={isOwner!}
                      text={
                        <div style={{ padding: '8px 0', fontSize: 15 }}>
                          {task.assignTo ? 
                            <Avatar>
                              {task.assignTo!.firstname[0].toUpperCase() + '' + task.assignTo!.lastname[0].toUpperCase()}
                            </Avatar> : 
                            <Avatar icon={<UserOutlined />} /> 
                          }
                          {task.assignTo ? 
                            <span style={{ marginLeft: 8 }}>{task.assignTo.firstname + ' ' + task.assignTo.lastname}</span> : 
                            <span style={{ marginLeft: 8 }}>Not set</span>
                          }
                        </div>
                      }
                      type="select"
                      childRef={assignToRef}
                    >
                      <div>
                        <Select
                          ref={assignToRef} 
                          value={assignTo} 
                          style={{ width: 200 }}
                          onSelect={handleSelectAssignee}
                          placeholder="Select member"
                        >
                          {project!.members.map(member =>
                            <Select.Option 
                              key={member.id} 
                              value={member.id} 
                              disabled={task.assignTo && task.assignTo.id === member.id}
                            >
                              <div>
                                <Avatar size={25} style={{ backgroundColor: color }}>
                                  {member.firstname[0].toUpperCase() + '' + member.lastname[0].toUpperCase()}
                                </Avatar>
                                <span style={{ marginLeft: 8 }}>{member.firstname + ' ' + member.lastname}</span>
                              </div>
                            </Select.Option>)}
                        </Select>
                      </div>
                    </Editable>
                  </div>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <h4 style={{ margin: 0, fontSize: 14 }}>Reporter</h4>
                  <div style={{ fontSize: 15 }}>{task.reporter.firstname + ' ' + task.reporter.lastname}</div>
                </div>
              </div>
            </div> : null
        }
      </Spin>
    </Modal>
  );
};