import React from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import { StyledSection } from '../FlowDetailsPage/FlowSettings/PaymentProcessorPage/styled';
import LoadingSkeleton from '../FlowDetailsPage/FlowSettings/PaymentProcessorPage/LoadingSkeleton';
import ConnectedSection from '../FlowDetailsPage/FlowSettings/PaymentProcessorPage/ConnectedSection';
import AvailableSection from '../FlowDetailsPage/FlowSettings/PaymentProcessorPage/AvailableSection';
import { P14 } from '../../components/atoms';
import THEME from '../../constants/theme';
import useListConnections from '../../hooks/useListConnections';
import { usePaymentFlowContext } from '../FlowDetailsPage/paymentFlowContext';
import DetailsHeader from './DetailsHeader';

const DESCRIPTION_1 =
  'Authorize your payment processors to allow Whenthen to send your authorizations to the right place and to populate your Payments Insight experience.';
const DESCRIPTION_2 =
  'You can connect multiple payment processors to enable more sophisticated automations like gateway routing and redundancy.';

const PaymentProcessors = () => {
  const { t } = useTranslation();
  const { flow, loading: flowLoading } = usePaymentFlowContext();
  const { availableProcessors, connectedProcessors, defaultProcessor, loading } = useListConnections({
    flow,
  });

  return (
    <>
      <DetailsHeader />
      <StyledSection>
        <Box>
          {loading || flowLoading ? (
            <LoadingSkeleton />
          ) : (
            <>
              <ConnectedSection connectedProcessors={connectedProcessors} defaultProcessor={defaultProcessor || ''} />
              <AvailableSection availableProcessors={availableProcessors} />
            </>
          )}
        </Box>
        <Box>
          <P14 color={THEME.greyColors.grey1} lineHeight="24px">
            {t(DESCRIPTION_1)}
            <br />
            <br />
            {t(DESCRIPTION_2)}
          </P14>
        </Box>
      </StyledSection>
    </>
  );
};

export default PaymentProcessors;
