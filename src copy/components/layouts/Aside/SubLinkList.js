import PropTypes from 'prop-types';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { capitalize } from '@material-ui/core';

import { List } from './StyledAside';
import SubLink from './SubLink';
import { useFeature } from '../../../hooks/useFeature';
import { FEATURE_TOGGLES_KEYS } from '../../../constants/featureToggles';
import usePermissionChecker from '../../../permissions/hooks/usePermissionChecker';
import { transformSiteMap } from './constant';

const SubLinkList = ({ persistSearch, path, subRoutes }) => {
  const location = useLocation();
  const { checkPermission } = usePermissionChecker();
  const [insightsNavEnabled] = useFeature(FEATURE_TOGGLES_KEYS.INSIGHTS_NAV);
  const [paymentIssuesNavEnabled] = useFeature(FEATURE_TOGGLES_KEYS.PAYMENT_ISSUES_SUB_NAV);
  const [settingsElementsNavEnabled] = useFeature(FEATURE_TOGGLES_KEYS.SETTINGS_ELEMENTS_NAV);

  const navFeatures = {
    [FEATURE_TOGGLES_KEYS.INSIGHTS_NAV]: insightsNavEnabled,
    [FEATURE_TOGGLES_KEYS.PAYMENT_ISSUES_SUB_NAV]: paymentIssuesNavEnabled,
    [FEATURE_TOGGLES_KEYS.SETTINGS_ELEMENTS_NAV]: settingsElementsNavEnabled,
  };

  /**Filter by feature toggles */
  const permittedRoutes = transformSiteMap({ sitemap: subRoutes, navFeatures, checkPermission }) || [];

  return (
    <List margin="31px 0 0">
      {permittedRoutes?.map(({ title: subRouteTitle, path: subPath, exact, isActive, disabled, target, href }) => (
        <li key={subRouteTitle}>
          <SubLink
            title={capitalize(subRouteTitle)}
            to={`${path}${subPath}${persistSearch ? location?.search || '' : ''}`}
            exact={exact}
            isActive={isActive}
            disabled={disabled}
            target={target}
            href={href}
          />
        </li>
      ))}
    </List>
  );
};

SubLinkList.propTypes = {
  path: PropTypes.string.isRequired,
  persistSearch: PropTypes.bool,
  subRoutes: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      subRouteTitle: PropTypes.string,
      path: PropTypes.string,
      exact: PropTypes.bool,
      isActive: PropTypes.func,
      disabled: PropTypes.bool,
      target: PropTypes.string,
      href: PropTypes.string,
    })
  ).isRequired,
};

SubLinkList.defaultProps = {
  persistSearch: false,
};

export default SubLinkList;
