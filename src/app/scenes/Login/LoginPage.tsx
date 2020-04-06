import * as React from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button } from 'antd';
import { LoginFormContainer, LoginForm, LoginFormTitle } from './styled';
import { FormComponentProps } from 'antd/lib/form';
import { RouteComponentProps } from 'react-router';
import ROUTES from '../../routes';
import { ILoginUserVariables } from '../../types';
import * as actions from '../../redux/auth/actions';

interface IDispatchProps {
  login: (values: ILoginUserVariables) => void;
}

interface IProps extends FormComponentProps, RouteComponentProps, IDispatchProps {}

const LoginPage: React.FC<IProps> = (props) => {
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.form.validateFields(
      (err: any, values: { password: string; username: string }) => {
        if (!err) {
          props.login(values);
        }
      }
    );
  };

  const { getFieldDecorator } = props.form;
  return (
    <LoginFormContainer>
      <LoginForm onSubmit={handleSubmit}>
        <LoginFormTitle>
          <Icon type="lock" /> Username
        </LoginFormTitle>
        <Form.Item>
          {getFieldDecorator('username', {
            validateTrigger: 'onSubmit',
            rules: [
              { required: true, message: 'Please input your username!' },
              { min: 6, message: 'Minimum length of login is 6' }
            ]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            validateTrigger: 'onSubmit',
            rules: [
              { required: true, message: 'Please input your Password!' },
              { min: 6, message: 'Minimum length of password is 6' }
            ]
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
  (dispatch): IDispatchProps => ({
    login: (values: ILoginUserVariables) => dispatch(actions.login.started(values))
  })
)(WrappedNormalLoginForm);
