import * as React from 'react';
import { Switch, Route } from 'react-router';
import ROUTES from '../../../routes';
import { Profile } from './Profile/Profile';
import { Projects } from './Projects/Projects';
import { ProjectPage } from './Projects/ProjectPage/ProjectPage';
import { Board } from './Projects/Board/Board';

export const ContentRouter = () => {
  return (
    <Switch>
      <Route exact path={ROUTES.MAIN} render={() => <div>Main</div>} />
      <Route exact path={ROUTES.PROJECTS} component={Projects} />
      <Route exact path={ROUTES.PROJECT} component={ProjectPage} />
      <Route path={ROUTES.PROFILE} component={Profile} />
      <Route path={ROUTES.PROJECT_BOARD} component={Board} />
    </Switch>
  );
};
