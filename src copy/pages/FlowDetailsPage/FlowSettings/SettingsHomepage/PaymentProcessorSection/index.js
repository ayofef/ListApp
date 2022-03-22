import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import StyledSection from '../../components/StyledSection';
import StyledConfigureButton from '../../components/StyledConfigureButton';
import PaymentProcessors from './PaymentProcessors';
import BarLoadingState from '../LoadingState/BarLoadingState';
import { usePaymentFlowContext } from '../../../paymentFlowContext';

const TITLE = 'Payment processors';
const DESC =
  'Authorize your payment processors to allow WhenThen to send your authorizations to the right place and to populate your Payments Insight experience.';

const BUTTON_TITLE = 'No payment processors yet.';

const PaymentProcessorSection = ({ paymentProcessors, loading, defaultProcessor }) => {
  const { push, location } = useHistory();
  const { flowId } = usePaymentFlowContext();
  const handleConnectButton = useCallback(
    () => push(`/flows/${flowId}/details/settings/payment-processors${location?.search || ''}`),
    [push, flowId, location?.search]
  );

  const isEmptyData = useMemo(() => isEmpty(paymentProcessors), [paymentProcessors]);

  return (
    <StyledSection title={TITLE} description={DESC}>
      {/* LOADING_STATE  */}
      {loading && <BarLoadingState />}

      {/* EMPTY_STATE */}
      {!loading && isEmptyData && (
        <StyledConfigureButton title={BUTTON_TITLE} buttonLabel="Connect" onClick={handleConnectButton} />
      )}

      {!loading && !isEmptyData && (
        <PaymentProcessors
          paymentProcessors={paymentProcessors}
          handleConfigure={handleConnectButton}
          defaultProcessor={defaultProcessor}
        />
      )}
    </StyledSection>
  );
};

PaymentProcessorSection.propTypes = {
  paymentProcessors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      company: PropTypes.shape({
        name: PropTypes.string,
        logo: PropTypes.string,
      }),
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  defaultProcessor: PropTypes.string,
};

PaymentProcessorSection.defaultProps = {
  defaultProcessor: null,
};

export default PaymentProcessorSection;
