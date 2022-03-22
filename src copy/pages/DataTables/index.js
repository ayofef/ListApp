import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import GroupedPayments from '../Payments/GroupedPayments';

import Customers from './Customers';
import CustomerDetails from './Customers/CustomerDetails';

import Cards from './Cards';
import CardDetails from './Cards/CardDetails';

const DataTables = () => {
  const { path } = useRouteMatch();
  const redirectUrl = `${path}/customers`;

  return (
    <Switch>
      <Route path={`${path}/customers`} exact component={Customers} />
      <Route path={`${path}/cards`} exact component={Cards} />

      <Route path={[`${path}/grouped`, `${path}/grouped/views/:viewsId`]} exact component={GroupedPayments} />
      <Route path={`${path}/customers/details/:detailsId`} exact component={CustomerDetails} />
      <Route path={`${path}/cards/details/:detailsId`} exact component={CardDetails} />

      <Redirect to={redirectUrl} />
    </Switch>
  );
};

export default DataTables;
