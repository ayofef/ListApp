import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import GroupedPayments from './GroupedPayments';
import PaymentDetails from '../DataTables/PaymentDetails';
import PaymentIssues from '../DataTables/PaymentIssues';
import AllPayments from '../DataTables/AllPayments';
import Insights from '../InsightsPage';
import { useFeature } from '../../hooks/useFeature';
import { FEATURE_TOGGLES_KEYS } from '../../constants/featureToggles';
import ModulePermissionsProvider from '../../permissions/ModulePermissionsProvider';
import { PAYMENTS_PERMISSIONS, PAYMENTS_PERMISSIONS_IDS } from './permissions';
import RestrictedRoute from '../../permissions/RestrictedRoute';
import { UI_ROUTES } from '../../constants/routes';

const PaymentRoutesSwitch = () => {
  const { path } = useRouteMatch();
  const [insightsNavEnabled] = useFeature(FEATURE_TOGGLES_KEYS.INSIGHTS_NAV);

  return (
    <ModulePermissionsProvider permissions={PAYMENTS_PERMISSIONS}>
      <Switch>
        <Route path={[path, `${path}/views/:viewsId`]} exact component={AllPayments}>
          <AllPayments />
        </Route>

        <RestrictedRoute
          path={[`${path}/payment-issues`, `${path}/payment-issues/views/:viewsId`]}
          permission={PAYMENTS_PERMISSIONS_IDS.paymentsManagement}
          noPermissionPath={UI_ROUTES.PAYMENTS}
          exact
        >
          <PaymentIssues />
        </RestrictedRoute>

        <Route path={[`${path}/insights`, `${path}/insights/:status`]} exact>
          {insightsNavEnabled ? <Redirect to={path} /> : <Insights />}
        </Route>

        <Route path={[`${path}/grouped`, `${path}/grouped/views/:viewsId`]} exact component={GroupedPayments}>
          <GroupedPayments />
        </Route>

        <Route
          path={[
            `${path}/details/:detailsId`,
            `${path}/details/:detailsId/payment-issues/:issueId`,
            `${path}/views/:viewsId/details/:detailsId`,
            `${path}/views/:viewsId/details/:detailsId/payment-issues/:issueId`,
            `${path}/payment-issues/details/:issueId/payments/:detailsId`,
          ]}
          exact
          component={PaymentDetails}
        >
          <PaymentDetails />
        </Route>

        <Redirect to={path} />
      </Switch>
    </ModulePermissionsProvider>
  );
};

export default PaymentRoutesSwitch;
