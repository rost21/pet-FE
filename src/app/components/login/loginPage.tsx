import * as React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/login/actions';
import { Input, Button } from 'antd';
import Form from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import { LoginFormContainer, LoginForm, LoginFormTitle } from './styled';
import { FormComponentProps } from 'antd/lib/form';
import { RouteComponentProps } from 'react-router';
import ROUTES from '../../routes';

interface IProps extends FormComponentProps, RouteComponentProps {}

const LoginPage: React.FC<IProps> = (props) => {
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.form.validateFields(
      (err: any, values: { password: string; remember: boolean; username: string }) => {
        if (!err) {
          console.log('Received values of form: ', values);
          props.history.push(ROUTES.MAIN);
        }
      }
    );
  };

  const { getFieldDecorator } = props.form;
  return (
    <LoginFormContainer>
      <LoginForm onSubmit={handleSubmit}>
        <LoginFormTitle>
          <Icon type="lock" /> Login
        </LoginFormTitle>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a onClick={() => props.history.push(ROUTES.REGISTRATION)}>register now!</a>
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>
      </LoginForm>
    </LoginFormContainer>
  );
};

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(LoginPage);

export const LoginPageConnected = connect(
  // (state) => {
  //   const comeFrom =
  //     get(
  //       state.modals.openedModalWindows.find(
  //         m => m.type === ModalTypes.MOBILE_FULL_SCREEN_VIEW_ACTIONS
  //       ),
  //       'extra.comeFrom'
  //     ) || ''
  //   return {
  //     isAuthenticated: state.auth.isLoggedIn,
  //     publicImage: isReportEnabled(state) ? state.search.selectedImageId : '',
  //     comeFrom
  //   }
  // },
  null,
  (dispatch) => ({
    login: (value: string) => dispatch(actions.setText(value))
  })
)(WrappedNormalLoginForm);
