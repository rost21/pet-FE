import * as React from 'react';
import { Drawer, Button, Form, Input, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { IRootReducer } from 'app/redux/rootReducer';
import { createTask } from 'app/redux/task/actions';

interface IProps {
  drawerVisible: boolean;
  setDrawerVisible: (value: boolean) => void;
}

export const CreateTask: React.FC<IProps> = props => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  
  const { project } = useSelector((state: IRootReducer) => state.projectsReducer);

  const onFinish = async () => {
    const values = await form.validateFields();
    if (!values) {
      return;
    }
    const { title, description, type, assignTo } = values;
    props.setDrawerVisible(false);
    dispatch(createTask.started({ title, description, type, assignTo }));
  };

  return (
    <Drawer
      title="Create task"
      width="30%"
      placement="right"
      visible={props.drawerVisible}
      destroyOnClose
      onClose={() => {
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
            rules={[{ required: true, message: 'Please enter task title' }]}
            style={{ marginBottom: 12 }}
          >
            <Input placeholder="Enter task title" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter task description' }]}
            style={{ marginBottom: 12 }}
          >
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 4 }} placeholder="Enter task description" />
          </Form.Item>

          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: 'Please select task type' }]}
            style={{ marginBottom: 12 }}
          >
            <Select>
              <Select.Option value="story">Story</Select.Option>
              <Select.Option value="bug">Bug</Select.Option>
              <Select.Option value="improvement">Improvement</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="assignTo"
            label="Assign To"
            style={{ marginBottom: 12 }}
          >
            <Select 
              allowClear
              showSearch
              placeholder="Select member"
              filterOption={(input, option) =>
                option!.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {project!.members.map(member => 
                  <Select.Option key={member.id} value={member.id}>
                    {member.username}
                  </Select.Option>
              )}
            </Select>
          </Form.Item>

        </Form>
      </div>
    </Drawer>
  );
};