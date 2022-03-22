import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import Content from '../../components/layouts/MainLayout/Content';
import ElementsPage from './ElementsPage';
import People from '../People';
import ProfilePage from '../ProfilePage';
import Developers from './Developers';
import ConnectionsPage from '../ConnectionsPage';
import { SITE_MAP, UI_ROUTES } from '../../constants/routes';
import { useFeature, useFeatureChecker } from '../../hooks/useFeature';
import { FEATURE_TOGGLES_KEYS } from '../../constants/featureToggles';
import { SETTINGS_PERMISSIONS_IDS } from './permissions';
import usePermission from '../../permissions/hooks/usePermission';
import usePermissionChecker from '../../permissions/hooks/usePermissionChecker';
import { isDefined } from '../../utils/helpers';

const SettingsPage = () => {
  const [settingsElementsNavEnabled] = useFeature(FEATURE_TOGGLES_KEYS.SETTINGS_ELEMENTS_NAV);
  const [canManageUsers] = usePermission(SETTINGS_PERMISSIONS_IDS.userManagement);
  const [canManageConnections] = usePermission(SETTINGS_PERMISSIONS_IDS.connections);
  const [canAccessDevelopersSection] = usePermission(SETTINGS_PERMISSIONS_IDS.developers);
  const { checkPermission } = usePermissionChecker();
  const { checkFeature } = useFeatureChecker();

  const { path } = useRouteMatch();
  const menu = SITE_MAP.find((r) => r.path === path);

  const routeComponents = {
    ...(settingsElementsNavEnabled ? { '/elements': ElementsPage } : {}),
    '/profile': ProfilePage,
    ...(canManageUsers ? { '/directory': People } : {}),
    ...(canAccessDevelopersSection ? { '/developers': Developers } : {}),
    ...(canManageConnections ? { '/connections': ConnectionsPage } : {}),
  };

  const firstNavItem = menu.subRoutes.find((item) => {
    if (isDefined(item.permission)) {
      const hasPermission = checkPermission(item.permission);

      if (!hasPermission) return false;
    }

    if (isDefined(item.features)) {
      const isFeatureDisabled = Object.keys(item.features).some(
        (featureId) => checkFeature(featureId) !== item.features[featureId].expectedValue
      );

      if (isFeatureDisabled) return false;
    }

    return true;
  });

  if (!firstNavItem) return <Redirect to={UI_ROUTES.root} />;

  return (
    <Content>
      <Switch>
        {menu.subRoutes.map(({ path: subRoutePath }) => (
          <Route
            key={`${path}${subRoutePath}`}
            path={`${path}${subRoutePath}`}
            component={routeComponents[subRoutePath]}
          />
        ))}

        <Redirect to={`${path}${firstNavItem.path}`} />
      </Switch>
    </Content>
  );
};

export default SettingsPage;
