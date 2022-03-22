import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PaymentViews from './Payments';

const ExtraLinks = () => (
  <Switch>
    <Route
      path={[
        '/payments',
        '/payments/details/:detailsId',
        '/payments/details/:detailsId/payment-issues/:issuesId',
        '/payments/views/:viewsId',
        '/payments/views/:viewsId/details/:detailsId',
        '/payments/views/:viewsId/details/:detailsId/payment-issues/:issuesId',
      ]}
      exact
      component={PaymentViews}
    />
  </Switch>
);

export default ExtraLinks;
