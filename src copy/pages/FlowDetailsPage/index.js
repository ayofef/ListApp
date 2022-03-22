import React, { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import Box from '@material-ui/core/Box';
import { Switch, Route, useRouteMatch, Redirect, useLocation, useParams } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Overview from './Overview';
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from './constant';
import { UI_ROUTES } from '../../constants/routes';
import FlowSettings from './FlowSettings';
import Automation from './Automation';
import { PaymentFlowContext } from './paymentFlowContext';
import { useGetFlowStats } from '../../hooks/useGetFlowStats';
import { CustomProgress } from '../../components/atoms';
import PremiumDialog from './PremiumDialog';
import { useRenameFlow } from './hooks/useRenameFlow';
import { isDefined } from '../../utils/helpers';
import useGetPaymentFlow from '../../hooks/useGetPaymentFlow';
import useListConnections from '../../hooks/useListConnections';

const FlowDetailsPage = () => {
  const { path } = useRouteMatch();
  const { pathname } = useLocation();
  const { id: pathFlowId } = useParams();

  const [flow, setFlow] = useState({});
  const [saving, setSaving] = useState(false);

  const { flow: flowData, flowId, loading, refetch, refetchLoading } = useGetPaymentFlow();
  const {
    availableProcessors,
    connectedProcessors,
    defaultProcessor,
    hasProcessorErrors,
    loading: connectionsLoading,
    enabledPaymentMethods,
  } = useListConnections({ flow });

  const [getFlowStats, { flowStats, _loading }] = useGetFlowStats();
  const { handleRename, handleFieldReset, newName, setNewName } = useRenameFlow({ setSaving, setFlow, flow });
  const [openPremiumDialog, setOpenPremiumDialog] = useState(false);
  const togglePremiumDialog = useCallback(() => setOpenPremiumDialog((prevState) => !prevState), []);

  const mainContentRef = useRef(null);

  const automationsList = useMemo(() => flowData?.automations ?? [], [flowData?.automations]);

  useEffect(() => {
    if (flowData?.id) {
      getFlowStats({
        variables: { flowId: flowData?.id },
      });
      setFlow(flowData);
    }
  }, [flowData, getFlowStats]);

  useEffect(() => {
    if (isDefined(mainContentRef?.current)) {
      mainContentRef.current.scrollTop = 0;
    }
  }, [pathname]);

  const value = useMemo(
    () => ({
      flow,
      flowId,
      refetch,
      refetchLoading,
      loading: loading || _loading || connectionsLoading,
      setFlow,
      flowStats,
      saving,
      setSaving,
      automationsList,
      togglePremiumDialog,
      handleFieldReset,
      newName,
      setNewName,
      handleRename,
      availableProcessors,
      connectedProcessors,
      defaultProcessor,
      hasProcessorErrors,
      enabledPaymentMethods,
    }),
    [
      flow,
      flowId,
      refetch,
      refetchLoading,
      loading,
      _loading,
      connectionsLoading,
      flowStats,
      saving,
      setSaving,
      automationsList,
      togglePremiumDialog,
      handleFieldReset,
      newName,
      setNewName,
      handleRename,
      availableProcessors,
      connectedProcessors,
      defaultProcessor,
      hasProcessorErrors,
      enabledPaymentMethods,
    ]
  );

  if (!pathFlowId) {
    return <Redirect to={UI_ROUTES.flows} />;
  }

  return (
    <PaymentFlowContext.Provider value={value}>
      <Box width="100%" height="100vh" overflow="hidden">
        <Header />
        <Box
          width="100%"
          top="64px"
          position="relative"
          overflow="auto"
          height={`calc(100% - ${HEADER_HEIGHT})`}
          ref={mainContentRef}
        >
          <Sidebar />
          <Box
            ml={SIDEBAR_WIDTH}
            width={`calc(100% - ${SIDEBAR_WIDTH})`}
            display="block"
            py="32px"
            height="100%"
            boxSizing="border-box"
          >
            <Box p="32px 40px" display="flex" alignItems="center" justifyContent="center" position="relative">
              <Box display="flex" flexDirection="column" alignItems="flex-start" flex={1} maxWidth="1040px">
                <Box width="100%">
                  <Switch>
                    <Route path={UI_ROUTES.flowDetails} exact component={Overview} />
                    <Route
                      path={[`${UI_ROUTES.flowSettings}`, `${UI_ROUTES.flowSettings}/:subPage`]}
                      exact
                      component={FlowSettings}
                    />
                    <Route path={[`${UI_ROUTES.flowDetails}/automations`]} exact>
                      {process.env.REACT_APP_HIDE_FLAG?.includes('automations') ? (
                        <Redirect to={path} />
                      ) : (
                        <Automation />
                      )}
                    </Route>
                    <Redirect to={path} />
                  </Switch>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        {openPremiumDialog && <PremiumDialog toggleIsOpen={togglePremiumDialog} />}
      </Box>
      {saving && <CustomProgress />}
    </PaymentFlowContext.Provider>
  );
};

export default FlowDetailsPage;
