import * as React from 'react';
import { connect } from 'react-redux';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Button } from 'antd';
import { LoginFormContainer, LoginForm, LoginFormTitle, FormItem } from './styled';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
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
			<img src="https://www.brandbucket.com/sites/default/files/logo_uploads/278374/large_xlancer_0.png" width="260" />
			<LoginForm onSubmit={handleSubmit}>
				<LoginFormTitle>
					<LockOutlined /> Login
				</LoginFormTitle>
				<FormItem>
					{getFieldDecorator('username', {
						validateTrigger: 'onSubmit',
						rules: [
							{ required: true, message: 'Please input your username!' },
							{ min: 6, message: 'Minimum length of login is 6' }
						]
					})(
						<Input
							prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
							placeholder="Username"
						/>
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('password', {
						validateTrigger: 'onSubmit',
						rules: [
							{ required: true, message: 'Please input your Password!' },
							{ min: 6, message: 'Minimum length of password is 6' }
						]
					})(
						<Input
							prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
							type="password"
							placeholder="Password"
						/>
					)}
				</FormItem>
				<FormItem>
					<Button type="primary" htmlType="submit" className="login-form-button">
            Log in
					</Button>
          Or <a onClick={() => props.history.push(ROUTES.REGISTRATION)}>register now!</a>
					<a className="login-form-forgot" href="#">
            Forgot password
					</a>
				</FormItem>
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
