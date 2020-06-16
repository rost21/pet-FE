import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LockOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import { Input, Button } from 'antd';
import { LoginFormContainer, FormTitle } from './styled';
import { RouteComponentProps } from 'react-router';
import ROUTES from '../../routes';
import * as actions from '../../redux/auth/actions';
import { IRootReducer } from 'app/redux/rootReducer';

interface IProps extends RouteComponentProps {}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export const LoginPage: React.FC<IProps> = props => {
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state: IRootReducer) => state.authReducer);

  const [form] = Form.useForm();

  const onFinish = (values: any) => {    
    dispatch(actions.login.started(values));
  };

	return (
		<LoginFormContainer>
			<img src="../../../assets/logo.png" width="260" />
      <FormTitle>
			  <LockOutlined /> Login
			</FormTitle>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          prefix: '38',
        }}
        scrollToFirstError
        style={{ marginTop: 16, maxWidth: 400 }}
      >
      
        <Form.Item
          name="username"
          label="Username"
          validateTrigger="onSubmit"
          rules={[
            { required: true, message: 'Please input your username!', whitespace: false },
            { min: 6, message: 'Minimum length of login is 6' },
            { max: 20, message: 'Maximum length of login is 20' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          validateTrigger="onSubmit"
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 6, message: 'Minimum length of password is 6' }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <>
            <Button type="primary" htmlType="submit" className="login-form-button" loading={isLoading}>
              Log in
            </Button>
            <div style={{ marginTop: 8 }}>
              Or <a onClick={() => props.history.push(ROUTES.REGISTRATION)}>register now</a>
              <a className="login-form-forgot" href="#">
                Forgot password
              </a>
            </div>
          </>
        </Form.Item>
        
      </Form>
	
		</LoginFormContainer>
	);
};