import PropTypes from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';
import ConnectionFees from './ConnectionFees';
import HistoricPayments from './HistoricPayments';
import LinkedFlows from './LinkedFlows';
import PaymentMethods from './PaymentMethods';
import { StyledStatusWrapper } from './styled';
import { useFeature } from '../../../../../hooks/useFeature';
import { FEATURE_TOGGLES_KEYS } from '../../../../../constants/featureToggles';

const StatusTab = ({ connection, linkedPaymentFlows, paymentFlowLoading }) => {
  const [multipleFlowEnabled] = useFeature(FEATURE_TOGGLES_KEYS.MULTIPLE_FLOW);
  return (
    <StyledStatusWrapper>
      <Box flex={1}>
        <LinkedFlows
          linkedPaymentFlows={linkedPaymentFlows}
          loading={paymentFlowLoading}
          connectionName={connection?.name || connection?.company?.name}
        />
        {!multipleFlowEnabled && connection?.historicalPayments && (
          <HistoricPayments
            connectionId={connection?.id}
            linkedPaymentFlows={linkedPaymentFlows}
            paymentFlowLoading={paymentFlowLoading}
          />
        )}
        {multipleFlowEnabled && (
          <PaymentMethods
            connectionId={connection?.id}
            supportedPaymentMethods={connection?.supportedPaymentMethods}
            enabledPaymentMethods={connection?.enabledPaymentMethods}
          />
        )}
      </Box>
      <Box flex={1}>
        <ConnectionFees
          connectionId={connection?.id}
          pricingUrl={connection?.company?.pricingUrl}
          connectionName={connection?.company?.name}
        />

        {multipleFlowEnabled && connection?.historicalPayments && (
          <HistoricPayments
            connectionId={connection?.id}
            linkedPaymentFlows={linkedPaymentFlows}
            paymentFlowLoading={paymentFlowLoading}
          />
        )}
      </Box>
    </StyledStatusWrapper>
  );
};

StatusTab.propTypes = {
  connection: PropTypes.shape({
    name: PropTypes.string,
    company: PropTypes.shape({
      name: PropTypes.string,
      pricingUrl: PropTypes.string,
    }),
    id: PropTypes.string,
    supportedPaymentMethods: PropTypes.arrayOf(PropTypes.string).isRequired,
    enabledPaymentMethods: PropTypes.arrayOf(PropTypes.string).isRequired,
    historicalPayments: PropTypes.bool.isRequired,
  }).isRequired,
  linkedPaymentFlows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
  paymentFlowLoading: PropTypes.bool.isRequired,
};

export default StatusTab;
