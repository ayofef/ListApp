import React from 'react';
import { Redirect, Route, Switch, useRouteMatch, useLocation } from 'react-router-dom';
import Content from '../../components/layouts/MainLayout/Content';
import Header from './Header';
import Flows from './Flows';
import { useGetFlows } from '../../hooks/useGetFlows';

const FlowsPage = () => {
  const { path, url } = useRouteMatch();
  const { pathname } = useLocation();
  const { allFlows, draftFlows, liveFlows, loading } = useGetFlows();
  const [, currentPage] = pathname.split(`${path}/`);

  return (
    <Content>
      <Header path={path} currentPage={currentPage} />

      <Switch>
        <Route path={path} exact>
          <Flows flows={allFlows} loading={loading} currentPage={currentPage} />
        </Route>

        <Route path={`${path}/published`} exact>
          <Flows flows={liveFlows} loading={loading} currentPage={currentPage} />
        </Route>

        <Route path={`${path}/unpublished`} exact>
          <Flows flows={draftFlows} loading={loading} currentPage={currentPage} />
        </Route>

        <Redirect to={url} />
      </Switch>
    </Content>
  );
};
export default FlowsPage;
