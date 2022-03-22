import React from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { HeaderWrapper, StyledBox } from './styled';
import ActionButtons from './ActionButtons';
import Title from './Title';
import { Tag } from '../../../components/atoms';
import THEME from '../../../constants/theme';
import { usePaymentFlowContext } from '../paymentFlowContext';

const Header = () => {
  const { t } = useTranslation();
  const { flowId, hasProcessorErrors } = usePaymentFlowContext();
  const location = useLocation();

  return (
    <HeaderWrapper>
      <Title />

      <StyledBox>
        {hasProcessorErrors && (
          <Box mr="16px">
            <Link to={`/flows/${flowId}/details/settings/payment-processors${location?.search ?? ''}`}>
              <Tag
                color={THEME.secondaryColors.nodeError}
                borderColor="#fff"
                marginTop="0"
                backgroundColor="rgba(183, 66, 66, 0.1)"
                fontSize="12px"
                fontWeight="600"
              >
                {t('Payment Processor Error')}
              </Tag>
            </Link>
          </Box>
        )}
        <ActionButtons />
      </StyledBox>
    </HeaderWrapper>
  );
};

export default Header;
