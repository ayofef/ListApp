import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import { useLocation } from 'react-router-dom';
import { capitalize } from '@material-ui/core';
import { UI_ROUTES, SITE_MAP } from '../../../constants/routes';
import { useStyles } from '../Root/styled';
import { StyledAside, LinkLists, StyledSwitchUser, LinkIcon, StyledIconButton, AsideTooltip } from './StyledAside';
import { useGlobalContext } from '../../../containers/App/context';
import SubLinks from './SubLinks';
import RouteIcon from '../../../assets/icons/MainNav';
import SwitchUser from '../../SwitchUser';
import CollapsableIcon from '../../../assets/icons/MainNav/Collapsable';
import Support from '../../../assets/icons/MainNav/Support';
import Notification from '../../../assets/icons/MainNav/Notification';
import { useHasNotification } from '../../../providers/LeftAsideProvider';
import ProfileNav from '../../ProfileNav';
import SupportModal from '../../SupportModal';
import NotificationCenter from '../../NotificationCenter';

import { useFeature } from '../../../hooks/useFeature';
import { FEATURE_TOGGLES_KEYS } from '../../../constants/featureToggles';
import { transformSiteMap, USER_PILOT_SECTION_ID } from './constant';
import usePermissionChecker from '../../../permissions/hooks/usePermissionChecker';
import { ROUTE_FEATURE_KEYS } from '../../../constants/routeFeatureKeys';
import { generateUserPilotAttribute } from '../../../constants/generateUserPilotLabel';

const Aside = () => {
  const {
    sidebarCollapsed,
    sidebarWidth,
    toggleDrawer,
    getMeData,
    toggleIntercom,
    hasCompletedGettingStartedChecklist,
  } = useGlobalContext();

  const classes = useStyles({ sidebarWidth, sidebarCollapsed });
  const hasNotification = useHasNotification();
  const { pathname } = useLocation();
  const [multipleFlowEnabled] = useFeature(FEATURE_TOGGLES_KEYS.MULTIPLE_FLOW);
  const [insightsNavEnabled] = useFeature(FEATURE_TOGGLES_KEYS.INSIGHTS_NAV);
  const { checkPermission } = usePermissionChecker();
  const [notification, setNotification] = useState(false);
  const [showCommunityModal, setShowCommunityModal] = useState(false);

  const toggleCommunityModal = () => setShowCommunityModal((prevState) => !prevState);
  const toggleNotification = () => setNotification((prevState) => !prevState);

  const isGettingStarted = pathname === UI_ROUTES.home;

  const navFeatures = {
    [FEATURE_TOGGLES_KEYS.INSIGHTS_NAV]: insightsNavEnabled,
    [FEATURE_TOGGLES_KEYS.MULTIPLE_FLOW]: multipleFlowEnabled,
    [ROUTE_FEATURE_KEYS.completedGettingStarted]: hasCompletedGettingStartedChecklist,
  };

  const siteMap = transformSiteMap({ sitemap: SITE_MAP, navFeatures, checkPermission });

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <StyledAside>
        <LinkLists>
          {/*Dont show uncollapse button on getting started page */}
          <StyledSwitchUser sidebarCollapsed={!isGettingStarted && sidebarCollapsed}>
            <StyledIconButton onClick={toggleDrawer}>
              <CollapsableIcon fill="#787F88" />
            </StyledIconButton>

            <SwitchUser />
          </StyledSwitchUser>

          {siteMap.map(({ title, path, isActive }) => {
            const Icon = RouteIcon[title] ?? title[0].toUpperCase();
            const defaultLinkTo = {
              'data tables': `${path}/customers`,
            };

            if (
              (getMeData?.getGettingStartedDetails?.onboardingStepsCompleted && title === 'getting started') ||
              process.env.REACT_APP_HIDE_FLAG?.includes(title) ||
              (getMeData?.we?.metadata?.firstTimeEntry?.markedAsCompleted && title === 'getting started')
            ) {
              return null;
            }

            return (
              <Box
                component="li"
                mt="24px"
                key={title}
                {...generateUserPilotAttribute(USER_PILOT_SECTION_ID, 'main', title)}
              >
                <AsideTooltip title={capitalize(title)} placement="right">
                  <LinkIcon
                    to={defaultLinkTo[title] ?? path}
                    size={40}
                    activeClassName="active"
                    {...(isActive && { isActive })}
                  >
                    <Icon />
                  </LinkIcon>
                </AsideTooltip>
              </Box>
            );
          })}

          <Box component="li" mt="auto">
            <StyledIconButton onClick={toggleCommunityModal}>
              <Support />
            </StyledIconButton>
          </Box>
          {/* Hide Notification */}
          <Box component="li" mt="20px">
            <StyledIconButton onClick={toggleNotification}>
              <Notification hasNotification={hasNotification} />
            </StyledIconButton>
          </Box>
          <Box component="li" mt="26px">
            <ProfileNav toggleCommunityModal={toggleCommunityModal} />
          </Box>
        </LinkLists>

        <SubLinks />
      </StyledAside>
      <SupportModal toggleIsOpen={toggleCommunityModal} isOpen={showCommunityModal} toggleIntercom={toggleIntercom} />
      <NotificationCenter isOpen={notification} toggleNotification={toggleNotification} />
    </Drawer>
  );
};

export default Aside;
