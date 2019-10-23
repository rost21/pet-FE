import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { hot } from 'react-hot-loader';
import { LoginPageConnected } from './components/login/loginPage';

export const App = hot(module)(() => (
  <Switch>
    <Route path="/auth" component={LoginPageConnected} />
    <Redirect to="/auth" />
  </Switch>
));
