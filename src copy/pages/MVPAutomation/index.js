import React, { useEffect, useMemo, useState, useRef } from 'react';
import { Redirect, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import { Box } from '@material-ui/core';
import Content from '../../components/layouts/MainLayout/Content';
import Header from './Header';
import Overview from './Overview';
import Directory from './Directory';
import useGetPaymentFlow from '../../hooks/useGetPaymentFlow';
import { UI_ROUTES } from '../../constants/routes';
import PaymentProcessors from './PaymentProcessors';
import { PaymentFlowContext } from '../FlowDetailsPage/paymentFlowContext';
import { CustomProgress } from '../../components/atoms';
import { isDefined } from '../../utils/helpers';
import RestrictedRoute from '../../permissions/RestrictedRoute';
import { AUTOMATION_PERMISSIONS_IDS } from './permissions';
import useIsDemo from '../../hooks/useIsDemo';

const MVPAutomation = () => {
  const [flow, setFlow] = useState({});
  const { flow: flowData, flowId, loading, connectionIds, refetch, refetchLoading } = useGetPaymentFlow();
  const isDemo = useIsDemo();
  const { path, url } = useRouteMatch();
  const { pathname } = useLocation();
  const [, currentPage] = pathname.split(`${path}/`);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (flowData?.id) {
      setFlow(flowData);
    }
  }, [flowData]);

  const context = useMemo(
    () => ({
      flow,
      setFlow,
      flowId,
      loading,
      connectionIds,
      setSaving,
      refetch,
      refetchLoading,
    }),
    [flow, flowId, loading, connectionIds, refetch, refetchLoading]
  );

  const mainContentRef = useRef(null);

  useEffect(() => {
    if (isDefined(mainContentRef?.current)) {
      mainContentRef.current.scrollTop = 0;
    }
  }, [pathname]);

  return (
    <PaymentFlowContext.Provider value={context}>
      <Content ref={mainContentRef}>
        <Header currentPage={currentPage} hideButton={isDemo} />

        <Box maxWidth="1040px" margin="0 auto">
          <Switch>
            <RestrictedRoute path={UI_ROUTES.automations} permission={AUTOMATION_PERMISSIONS_IDS.automations} exact>
              <Overview />
            </RestrictedRoute>

            <RestrictedRoute
              path={UI_ROUTES.automationsDirectory}
              permission={AUTOMATION_PERMISSIONS_IDS.automations}
              exact
            >
              <Directory />
            </RestrictedRoute>

            <RestrictedRoute
              path={UI_ROUTES.automationsPaymentProcessors}
              permission={AUTOMATION_PERMISSIONS_IDS.automations}
              exact
            >
              <PaymentProcessors />
            </RestrictedRoute>

            <Redirect to={url} />
          </Switch>
        </Box>

        {saving && <CustomProgress />}
      </Content>
    </PaymentFlowContext.Provider>
  );
};

export default MVPAutomation;
