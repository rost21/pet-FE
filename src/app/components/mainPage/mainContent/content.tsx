import * as React from 'react';
import { Switch, Route } from 'react-router';
import { LoginPageConnected } from 'app/components/login/loginPage';
import ROUTES from '../../../routes';

export const ContentRouter = () => {
  return (
    <Switch>
      <Route exact path={`${ROUTES.MAIN}${ROUTES.PROJECTS}`} component={LoginPageConnected} />
      {/* <Route path="/" component={LoginPageConnected} /> */}
    </Switch>
  );
};
