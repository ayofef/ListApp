import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { UI_ROUTES } from '../../constants/routes';
import routeComponents from './RouteComponents';
import { FEATURE_TOGGLES_KEYS } from '../../constants/featureToggles';
import { useFeature } from '../../hooks/useFeature';
import { isDefined } from '../../utils/helpers';

const DashboardRoutes = () => {
  const [insightsNavEnabled] = useFeature(FEATURE_TOGGLES_KEYS.INSIGHTS_NAV);
  const [multipleFlowEnabled] = useFeature(FEATURE_TOGGLES_KEYS.MULTIPLE_FLOW);

  const navFeatures = {
    [FEATURE_TOGGLES_KEYS.INSIGHTS_NAV]: insightsNavEnabled,
    [FEATURE_TOGGLES_KEYS.MULTIPLE_FLOW]: multipleFlowEnabled,
  };

  const routes = Object.entries(routeComponents).map(
    ([item, { path, exact, component: Component, featureToggles }]) => {
      if (!path) return null;

      /* if we have feature toggle defined and expected value match feature value, return the route component */
      if (isDefined(featureToggles) && isDefined(navFeatures[featureToggles?.id])) {
        const { expectedValue } = featureToggles;
        if (navFeatures[featureToggles?.id] !== expectedValue) {
          return null;
        }
      }

      return <Route key={item} exact={exact} path={path} component={Component} />;
    }
  );

  return (
    <Switch>
      {routes}

      <Redirect path="*" to={`${UI_ROUTES.root}${UI_ROUTES.home}`} />
    </Switch>
  );
};

export default DashboardRoutes;
