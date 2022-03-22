import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { COMMON_CONNECTION_STYLE_PROPS, CONTAINER_HEIGHT } from '../../constant';
import { H2, P14 } from '../../../../atoms';
import {
  TITLE,
  DESC,
  SCROLL_INDICATOR_OFFSET,
} from '../../../../../pages/ConnectionsPage/components/PaymentMethodDialog/constant';
import THEME from '../../../../../constants/theme';
import PaymentMethods from '../../../../../pages/ConnectionsPage/components/PaymentMethods';
import { StyledBox } from './styled';
import { StyledScrollIndicator } from '../../../../Dialog/styled';
import { FIELDS } from '../../../../../pages/ConnectionsPage/components/PaymentMethodDialog/formSettings';
import { handleScrollIndicator } from '../../../../Dialog/handleScrollIndicator';

const PaymentMethodForm = ({ supportedPaymentMethods }) => {
  const { t } = useTranslation();
  const [scroll, setScroll] = useState(true);
  const toggleScrollIndicator = () => setScroll((prevState) => !prevState);

  const handleContentScroll = (e) => {
    handleScrollIndicator(e, scroll, toggleScrollIndicator, SCROLL_INDICATOR_OFFSET);
  };

  return (
    <Box display="flex" height={CONTAINER_HEIGHT}>
      <Box {...COMMON_CONNECTION_STYLE_PROPS} borderRight="1px solid rgba(193, 195, 198, 0.2)" pl="0">
        <H2 fontWeight="700" margin="0 0 24px 0" width="369px">
          {t(TITLE)}
        </H2>
        <P14 margin="0 0 16px 0" color={THEME.greyColors.grey11} width="369px">
          {t(DESC)}
        </P14>
      </Box>
      <Box {...COMMON_CONNECTION_STYLE_PROPS} pr={0} py={0} position="relative" flex="1 0 520px">
        <StyledBox overflow="auto" width="100%" onScroll={handleContentScroll} py="16px" pr="32px">
          <PaymentMethods supportedPaymentMethods={supportedPaymentMethods} name={FIELDS.methods} />
        </StyledBox>
        <StyledScrollIndicator scrollEnd={!scroll}>&nbsp; </StyledScrollIndicator>
      </Box>
    </Box>
  );
};

PaymentMethodForm.propTypes = {
  supportedPaymentMethods: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PaymentMethodForm;
