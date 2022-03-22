import React from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';

import DetailsHeader from '../../Components/DetailsHeader';
import { StyledSection } from './styled';
import { P14 } from '../../../../components/atoms';
import THEME from '../../../../constants/theme';

import LoadingSkeleton from './LoadingSkeleton';
import ConnectedSection from './ConnectedSection';
import AvailableSection from './AvailableSection';
import { usePaymentFlowContext } from '../../paymentFlowContext';

const DESCRIPTION_1 =
  'Authorize your payment processors to allow Whenthen to send your authorizations to the right place and to populate your Payments Insight experience.';
const DESCRIPTION_2 =
  'You can connect multiple payment processors to enable more sophisticated automations like gateway routing and redundancy.';

const PaymentProcessorPage = () => {
  const { t } = useTranslation();
  const { availableProcessors, connectedProcessors, defaultProcessor, loading } = usePaymentFlowContext();

  return (
    <>
      <DetailsHeader />
      <StyledSection>
        <Box>
          {loading ? (
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

export default PaymentProcessorPage;
