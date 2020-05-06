import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { hot } from 'react-hot-loader';
import { LoginPage } from 'app/scenes/Auth/LoginPage';
import { RegistrationPage } from 'app/scenes/Auth/Registration';
import { MainPage } from 'app/scenes/MainPage/MainPage';
import 'antd/dist/antd.css';
import ROUTES from './routes';

export const App = hot(module)(() => (
	<div
		style={{
			width: '100%',
			height: '100%',
			backgroundColor: '#edf0f1',
			position: 'absolute',
			top: 0,
			right: 0,
			bottom: 0,
			left: 0
		}}
	>
		<Switch>
			<Route path={ROUTES.LOGIN} component={LoginPage} />
			<Route path={ROUTES.REGISTRATION} component={RegistrationPage} />
			<Route path={ROUTES.MAIN} component={MainPage} />
			<Redirect to={ROUTES.LOGIN} />
		</Switch>
	</div>
));
