import React, { useMemo, useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';

import DetailsHeader from '../../Components/DetailsHeader';
import CheckoutType from './CheckoutType';
import { StyledSection } from '../PaymentProcessorPage/styled';
import { CheckoutContextProvider } from './checkoutContext';
import { CHECKOUT_DICTIONARY } from './CheckoutType/constant';
import CustomCheckoutSidebar from './Sidebars/CustomCheckout';
import CustomCheckoutSubComponent from './SubComponents/CustomCheckout';
import { usePaymentFlowContext } from '../../paymentFlowContext';

const SIDEBAR_COMPONENT_MAP = {
  [CHECKOUT_DICTIONARY.customCheckout]: CustomCheckoutSidebar,
  [CHECKOUT_DICTIONARY.checkoutUiSdk]: CustomCheckoutSidebar,

  default: () => <Box>&nbsp;</Box>,
};

const SUB_COMPONENT_MAP = {
  [CHECKOUT_DICTIONARY.customCheckout]: CustomCheckoutSubComponent,
  [CHECKOUT_DICTIONARY.checkoutUiSdk]: CustomCheckoutSubComponent,

  default: () => <Box>&nbsp;</Box>,
};

const CheckoutPage = () => {
  const [active, setActive] = useState('');
  const { flow, loading } = usePaymentFlowContext();

  const checkoutType = flow?.configuredCheckout ?? CHECKOUT_DICTIONARY.none;

  const contextValue = useMemo(
    () => ({
      active,
      setActive,
      checkoutType,
      loading,
    }),
    [active, setActive, checkoutType, loading]
  );

  useEffect(() => {
    setActive(checkoutType);
  }, [setActive, checkoutType]);

  const Sidebar = SIDEBAR_COMPONENT_MAP[active] ?? SIDEBAR_COMPONENT_MAP.default;
  const SubComponent = SUB_COMPONENT_MAP[active] ?? SUB_COMPONENT_MAP.default;

  return (
    <CheckoutContextProvider value={contextValue}>
      <Box>
        <DetailsHeader />
        <StyledSection>
          <Box>
            <CheckoutType />
            <SubComponent />
          </Box>
          <Box component="aside">
            <Sidebar />
          </Box>
        </StyledSection>
      </Box>
    </CheckoutContextProvider>
  );
};

export default CheckoutPage;
