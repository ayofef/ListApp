import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { useGlobalContext } from '../context';
import CompleteProfileForm from '../components/CompleteProfile';
import TodoApp from '../components/TaskApp';

function RestrictedRoute() {
  const { hasCompletedProfile } = useGlobalContext();

  /**
   * TDOD: handle loading state for get profile
   */
  return (
    <Switch>
      <Route path="/complete-profile" exact>
        {hasCompletedProfile ? <Redirect to="/" /> : <CompleteProfileForm />}
      </Route>

      <Route path={['/task', '/task/:id']} exact>
        {hasCompletedProfile ? <TodoApp /> : <Redirect to="/complete-profile" />}
      </Route>

      <Redirect to="/task" />
    </Switch>
  );
}

export default RestrictedRoute;
