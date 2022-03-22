import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LiveConnections from './Live';
import ConnectionDetails from './ConnectionDetails';
import ConnectionConnectPage from './ConnectionConnectPage';
import OauthPage from './Oauth';
import ConnectFromPublicSitePage from './ConnectFromPublicSitePage';
import { FlexContainer } from '../../components/atoms/flex/FlexContainer';

const ConnectionsPage = () => {
  const { path, url } = useRouteMatch();
  const { t } = useTranslation();

  return (
    <FlexContainer
      alignItems="flex-start"
      flexDirection="column"
      justifyContent="flex-start"
      flex={1}
      borderRadius="24px 0 0 24px"
      overflow="hidden"
    >
      <Switch>
        <Route path={path} exact>
          <LiveConnections title={t('connections.live')} />
        </Route>
        <Route path={`${path}/details/:id`} component={ConnectionDetails} />
        <Route path={`${path}/oauth`} component={OauthPage} />
        <Route path={`${path}/connect`} component={ConnectFromPublicSitePage} />
        <Route path={`${path}/connect/:id`} component={ConnectionConnectPage} />

        {/* <Route path={`${path}/directory`} component={Directory} /> */}
        {/* <Route path={`${path}/archive`}>
          <LiveConnections title={t('connections.archive')} connectionCategories={archivedConnectionCategories} />
        </Route> */}
        <Redirect to={url} />
      </Switch>
    </FlexContainer>
  );
};

export default ConnectionsPage;
