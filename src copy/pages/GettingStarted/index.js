import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { useGlobalContext } from '../../containers/App/context';
import { UI_ROUTES } from '../../constants/routes';
import GettingStarted from './GettingStarted';
import { useGetGettingStartedPermission } from './useGetGettingStartedPermission';

const GettingStartedPage = () => {
  const { path } = useRouteMatch();
  const { hasCompletedGettingStartedChecklist } = useGlobalContext();

  const { hasGettingStartedPermission, redirectUrl } = useGetGettingStartedPermission({
    hasCompletedGettingStartedChecklist,
  });

  return (
    <Box p="16px 32px" position="relative" height="100%" width="100%">
      <Switch>
        <Route path={path} exact>
          {hasGettingStartedPermission ? <GettingStarted /> : <Redirect to={redirectUrl} />}
        </Route>

        <Redirect to={UI_ROUTES.home} />
      </Switch>
    </Box>
  );
};
export default GettingStartedPage;
