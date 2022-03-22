import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Box, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Insight from './Insight';
import THEME from '../../../constants/theme';
import { L16B } from '../../../components/atoms/Typography/L16B';
import { usePaymentFlowContext } from '../../FlowDetailsPage/paymentFlowContext';
import { UI_ROUTES } from '../../../constants/routes';
import { GET_CONNECTIONS } from '../../../utils/queries/connections/connectionsQueries';

const Wrapper = styled(Grid)`
  border: 1px solid ${THEME.greyColors.grey5};
  border-radius: 8px;
  margin-top: 16px;
`;

const types = ['PAYMENT_GATEWAY'];

const status = ['CONNECTED', 'BROKEN'];

const Insights = () => {
  const { push } = useHistory();
  const { connectionIds } = usePaymentFlowContext();

  const { data: allConnections, loading } = useQuery(GET_CONNECTIONS, {
    variables: {
      types,
      status,
    },
    fetchPolicy: 'no-cache',
  });

  const connections = useMemo(
    () => allConnections?.listConnections?.filter((connection) => connectionIds?.includes(connection?.id)),
    [allConnections, connectionIds]
  );

  const navigatePayments = () => {
    push(UI_ROUTES.automationsPaymentProcessors);
  };

  return (
    <Box mb="40px">
      <L16B>Insights</L16B>
      <Wrapper width="100%" container>
        <Insight
          value={connections?.length}
          title="Payment connections"
          connections={connections}
          onClick={navigatePayments}
          paymentsLoading={loading}
          fullWidth
        />
      </Wrapper>
    </Box>
  );
};

export default Insights;
