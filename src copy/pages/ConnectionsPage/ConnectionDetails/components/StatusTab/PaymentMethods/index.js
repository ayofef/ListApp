import PropTypes from 'prop-types';
import React, { useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';

import { StyledWrapper, StyledTitleWrapper } from '../styled';
import PaymentMethodItem from '../../../../components/PaymentMethods/PaymentMethodItem';
import { getPaymentMethodsOption } from '../../../../../../utils/generatePaymentMethodOptions';
import { P16B } from '../../../../../../components/atoms';
import { StyledPaymentMethodWrapper } from './styled';
import { useSetPaymentMethods } from '../../../../hooks/useSetPaymentMethods';
import { useGlobalContext } from '../../../../../../containers/App/context';

const TITLE = 'Payment Methods';

const PaymentMethods = ({ supportedPaymentMethods, enabledPaymentMethods, connectionId }) => {
  const { t } = useTranslation();
  const { handleSetPaymentMethods } = useSetPaymentMethods({ connectionId });
  const { setGlobalLoading } = useGlobalContext();
  const options = useMemo(
    () =>
      getPaymentMethodsOption(supportedPaymentMethods ?? [])?.sort(
        (a, b) => enabledPaymentMethods?.includes(b?.value) - enabledPaymentMethods?.includes(a?.value)
      ) ?? [],
    [supportedPaymentMethods, enabledPaymentMethods]
  );

  const handleSwitch = useCallback(
    (value) => {
      const methods =
        Array.isArray(enabledPaymentMethods) && enabledPaymentMethods?.includes(value)
          ? enabledPaymentMethods?.filter((paymentMethod) => paymentMethod !== value)
          : [...new Set([...(enabledPaymentMethods || []), value])];

      setGlobalLoading('connection:payment-methods', true);

      handleSetPaymentMethods({
        methods,
        callback: () => {
          setGlobalLoading('connection:payment-methods', false);
        },
      });
    },
    [handleSetPaymentMethods, enabledPaymentMethods, setGlobalLoading]
  );

  return (
    <StyledWrapper>
      <StyledTitleWrapper>
        <P16B>{t(TITLE)}</P16B>
      </StyledTitleWrapper>
      <Box>
        {options?.map((option) => (
          <StyledPaymentMethodWrapper>
            <PaymentMethodItem
              key={option?.value}
              option={option}
              handleSwitch={handleSwitch}
              selectedMethods={enabledPaymentMethods || []}
            />
          </StyledPaymentMethodWrapper>
        ))}
      </Box>
    </StyledWrapper>
  );
};

PaymentMethods.propTypes = {
  connectionId: PropTypes.string.isRequired,
  enabledPaymentMethods: PropTypes.arrayOf(PropTypes.string).isRequired,
  supportedPaymentMethods: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PaymentMethods;
