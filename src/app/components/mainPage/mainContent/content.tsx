import * as React from 'react';
import { Switch, Route } from 'react-router';
// import { LoginPageConnected } from 'app/components/login/loginPage';
import ROUTES from '../../../routes';

export const ContentRouter = () => {
  return (
    <Switch>
      <Route exact path={ROUTES.MAIN} render={() => <div>Main</div>} />
      <Route path={ROUTES.PROJECTS} render={() => <div>Projects</div>} />
      <Route path={ROUTES.PROFILE} render={() => <div>Profile</div>} />
    </Switch>
  );
};
