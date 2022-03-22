import React from 'react';
import { Box } from '@material-ui/core';
import isEmpty from 'lodash/isEmpty';
import Insights from './Insights';
import Automations from './Automations/Automations';
import TemplatesBlock from './TemplatesBlock';
import { usePaymentFlowContext } from '../../FlowDetailsPage/paymentFlowContext';
import BuildPaymentFlow from './BuildPaymentFlow';

const Overview = () => {
  const { flow, loading } = usePaymentFlowContext();

  const instructFlowId = flow?.instructFlowId;

  return (
    <Box mb="40px">
      <Insights />
      <Automations />
      {!loading && !instructFlowId && <BuildPaymentFlow />}
      {isEmpty(flow?.automations) && !loading && <TemplatesBlock />}
    </Box>
  );
};

export default Overview;
