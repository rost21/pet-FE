import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { hot } from 'react-hot-loader';
import { LoginPageConnected } from 'app/scenes/login/loginPage';
import { RegistrationPageConnected } from 'app/scenes/registration/registration';
import { MainPageConnected } from 'app/scenes/mainPage/mainPage';
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
      <Route path={ROUTES.LOGIN} component={LoginPageConnected} />
      <Route path={ROUTES.REGISTRATION} component={RegistrationPageConnected} />
      <Route path={ROUTES.MAIN} component={MainPageConnected} />
      <Redirect to={ROUTES.LOGIN} />
    </Switch>
  </div>
));
