import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';

import { UI_ROUTES } from '../../../constants/routes';

import SettingsHomepage from './SettingsHomepage';
import PaymentProcessorPage from './PaymentProcessorPage';
import CheckoutPage from './CheckoutPage';

const FlowSettings = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={UI_ROUTES.flowSettings} exact component={SettingsHomepage} />

      <Route path={UI_ROUTES.flowSettingsPaymentProcessor} exact component={PaymentProcessorPage} />
      <Route path={UI_ROUTES.flowSettingsCheckout} exact component={CheckoutPage} />

      <Redirect to={path} />
    </Switch>
  );
};

export default FlowSettings;
