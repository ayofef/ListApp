import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { NotificationContainer } from 'react-notifications';
import TagManager from 'react-gtm-module';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import { useLoginStatus, useNewRequestData } from '../../hooks/storageHooks';
import { useGlobalLoading } from '../../hooks/appHooks';
import PublicRoutes from '../../routes/PublicRoutes';
import RestrictedRoutes from '../../routes/RestrictedRoutes';
import '../../assets/css/notifications.css';
import { GTM_ID } from '../../constants/api';
import { useGetMe } from '../../hooks/useGetMe';
import useHistoryListen from '../../hooks/useHistoryListen';
import { GlobalContextProvider } from './context';
import { useIntercom } from '../../hooks/useIntercom';
import IntercomCloseButton from '../../components/layouts/Aside/IntercomClose';
import useLogout from '../../hooks/useLogout';
import FeatureContextComponent from './FeatureContextComponent';
import ApplicationPermissionsProvider from '../../permissions/ApplicationPermissionsProvider';
import { APPLICATION_PERMISSIONS } from '../../constants/permissions';
import { UserProvider } from '../../providers/User';

const tagManagerArgs = {
  gtmId: GTM_ID,
};

TagManager.initialize(tagManagerArgs);

const COLLAPSED_WIDTH = 72;

const App = () => {
  const [sidebarWidth, setSidebarWidth] = useState(320);
  const theme = useTheme();
  const { isLogin, setToken, setRefreshToken, logOut, setEmail } = useLoginStatus();
  const { updateNewRequestData, requestData } = useNewRequestData();
  const { globalLoading, setGlobalLoading } = useGlobalLoading();
  const { pathname, search } = useLocation();
  const isRedirectedFromPublicSite = pathname.includes('connections/details');
  const { toggleIntercom, intercomCloseButton, intercomIsOpen } = useIntercom();
  const { handleLogout } = useLogout(logOut);

  const {
    data: getMeData,
    loading: getMeLoading,
    isOwner,
    isAdmin,
    refetch: getMeRefetch,
    startPolling: getMeStartPolling,
    stopPolling: getMeStopPolling,
  } = useGetMe(isLogin);

  useHistoryListen();

  useEffect(() => {
    if (getMeLoading && getMeData === undefined) {
      setGlobalLoading('app', true);
    } else if (!getMeLoading && getMeData) {
      setGlobalLoading('app', false);
    }
    if (isRedirectedFromPublicSite && !isLogin) {
      const nextPath = pathname + search;
      sessionStorage.setItem('connect', nextPath);
    }
  }, [getMeLoading, setGlobalLoading, getMeData, isRedirectedFromPublicSite, pathname, search, isLogin]);

  const IS_TABLET = useMediaQuery(theme.breakpoints.down('sm'));

  const stepsCheckListMeta = getMeData?.we?.metadata?.checklist || {};
  const toggleDrawer = useCallback(() => {
    setSidebarWidth((prevState) => (prevState === 320 ? COLLAPSED_WIDTH : 320));
  }, []);
  const sidebarCollapsed = useMemo(() => sidebarWidth === COLLAPSED_WIDTH, [sidebarWidth]);

  const hasCompletedGettingStartedChecklist = useMemo(
    () =>
      getMeData?.getGettingStartedDetails?.onboardingStepsCompleted ||
      Boolean(getMeData?.we?.metadata?.firstTimeEntry?.markedAsCompleted),
    [
      getMeData?.getGettingStartedDetails?.onboardingStepsCompleted,
      getMeData?.we?.metadata?.firstTimeEntry?.markedAsCompleted,
    ]
  );

  return (
    <GlobalContextProvider
      value={{
        isLogin,
        setToken,
        setRefreshToken,
        globalLoading,
        setGlobalLoading,
        logOut: handleLogout,
        setEmail,
        getMeData,
        getMeLoading,
        isOwner,
        isAdmin,
        getMeRefetch,
        getMeStartPolling,
        getMeStopPolling,
        IS_TABLET,
        stepsCheckListMeta,
        updateNewRequestData,
        requestData,
        sidebarWidth,
        sidebarCollapsed,
        toggleDrawer,
        toggleIntercom,
        intercomIsOpen,
        intercomCloseButton,
        hasCompletedGettingStartedChecklist,
      }}
    >
      <UserProvider>
        {isLogin ? (
          <FeatureContextComponent>
            <ApplicationPermissionsProvider permissions={APPLICATION_PERMISSIONS}>
              <RestrictedRoutes />
            </ApplicationPermissionsProvider>
          </FeatureContextComponent>
        ) : (
          <PublicRoutes />
        )}
        <IntercomCloseButton intercomCloseButton={intercomCloseButton} toggleIntercom={toggleIntercom} />
        <NotificationContainer />
      </UserProvider>
    </GlobalContextProvider>
  );
};

export default App;
