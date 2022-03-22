import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

import StyledSection from '../../components/StyledSection';
import StyledConfigureButton from '../../components/StyledConfigureButton';
import PaymentProcessorConfirmationModal from './PaymentProcessorConfirmationModal';
import BarLoadingState from '../LoadingState/BarLoadingState';
import Checkout from './Checkout';
import { CHECKOUT_DICTIONARY } from '../../CheckoutPage/CheckoutType/constant';
import { TITLE, DESC, BUTTON_TITLE_DISABLED_STATE, BUTTON_TITLE_EMPTY_STATE } from './constant';
import { usePaymentFlowContext } from '../../../paymentFlowContext';

const CheckoutSection = ({ paymentProcessors, loading, checkoutType }) => {
  const { push, location } = useHistory();
  const { flowId } = usePaymentFlowContext();
  const [showModal, setShowModal] = useState(false);
  const toggleShowModal = useCallback(() => setShowModal((prevState) => !prevState), []);

  const disableConfigure = useMemo(() => isEmpty(paymentProcessors), [paymentProcessors]);
  const configuredCheckout = useMemo(() => checkoutType !== CHECKOUT_DICTIONARY.none, [checkoutType]);

  const handleConnectButton = useCallback(() => {
    if (disableConfigure) {
      toggleShowModal();
      return;
    }

    push(`/flows/${flowId}/details/settings/checkout${location?.search || ''}`);
  }, [disableConfigure, push, flowId, location?.search, toggleShowModal]);

  const handleModalConfirmation = useCallback(
    () => push(`/flows/${flowId}/details/settings/payment-processors${location?.search || ''}`),
    [push, flowId, location?.search]
  );

  return (
    <StyledSection title={TITLE} description={DESC}>
      {/* LOADING_STATE  */}
      {loading && <BarLoadingState checkout />}

      {!loading && (disableConfigure || !configuredCheckout) && (
        <StyledConfigureButton
          title={disableConfigure ? BUTTON_TITLE_DISABLED_STATE : BUTTON_TITLE_EMPTY_STATE}
          buttonLabel="Configure"
          onClick={handleConnectButton}
        />
      )}

      {!loading && disableConfigure && !configuredCheckout && (
        <PaymentProcessorConfirmationModal
          open={showModal}
          onCancel={toggleShowModal}
          onConfirm={handleModalConfirmation}
        />
      )}

      {/* COMPLETE_STATE  */}
      {!loading && !disableConfigure && configuredCheckout && (
        <Checkout paymentProcessors={paymentProcessors} handleConfigure={handleConnectButton} />
      )}
    </StyledSection>
  );
};

CheckoutSection.propTypes = {
  paymentProcessors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    })
  ).isRequired,
  checkoutType: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default CheckoutSection;
