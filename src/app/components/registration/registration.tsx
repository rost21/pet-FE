import * as React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/registration/actions';
import { Input, Button, Form, Icon } from 'antd';
import { LoginFormContainer, LoginForm, LoginFormTitle } from './styled';
import { FormComponentProps } from 'antd/lib/form';
import { RouteComponentProps } from 'react-router';
import { toast } from 'react-toastify';
import ROUTES from '../../routes';
import { IRegisterUserVariables } from '../types';

interface IDispatchProps {
  registration: (values: object) => void;
}

interface IProps extends FormComponentProps, RouteComponentProps, IDispatchProps {}

const RegistrationPage: React.FC<IProps> = (props) => {
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.form.validateFields(
      (
        err: any,
        values: { username: string; email: string; password: string; confirmPassword: string }
      ) => {
        if (!err) {
          console.log('Received values of form: ', values);
          if (values.password !== values.confirmPassword) {
            toast("Passwords don't match", {
              type: 'error',
              position: 'bottom-center',
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true
            });
            return;
          }
          props.registration(values);
          // props.history.push('/main');
        }
      }
    );
  };

  const { getFieldDecorator } = props.form;
  return (
    <LoginFormContainer>
      <LoginForm onSubmit={handleSubmit}>
        <LoginFormTitle>
          <Icon type="lock" /> Registration
        </LoginFormTitle>
        <Form.Item>
          {getFieldDecorator('username', {
            validateTrigger: 'onSubmit',
            rules: [
              { required: true, message: 'Please input your username' },
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
          {getFieldDecorator('email', {
            validateTrigger: 'onSubmit',
            rules: [
              { required: true, message: 'Please input your email!' },
              {
                pattern: new RegExp(
                  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
                ),
                message: 'Wrong email!'
              }
            ]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
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
          {getFieldDecorator('confirmPassword', {
            validateTrigger: 'onSubmit',
            rules: [
              { required: true, message: 'Please confirm your password!' },
              { min: 6, message: 'Minimum length of password is 6' }
            ]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Confirm password"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Rerister
          </Button>
          Or <a onClick={() => props.history.push(ROUTES.LOGIN)}>back to login</a>
        </Form.Item>
      </LoginForm>
    </LoginFormContainer>
  );
};

const WrappedNormalRegistrationForm = Form.create({ name: 'normal_register' })(RegistrationPage);

export const RegistrationPageConnected = connect(
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
    registration: (values: IRegisterUserVariables) => dispatch(actions.registration.started(values))
  })
)(WrappedNormalRegistrationForm);
