import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { P16B, P14 } from '../../../../components/atoms';
import { StyledChecks, StyledSuccessWrapper } from './styled';
import Check from '../../../../assets/icons/FlowStages/Check';

const SuccessScreen = ({ showSuccess, toggleSuccessScreen }) => {
  const { t } = useTranslation();
  useEffect(() => {
    if (showSuccess) {
      setTimeout(() => {
        toggleSuccessScreen();
      }, 3000);
    }
  }, [showSuccess, toggleSuccessScreen]);

  return (
    <StyledSuccessWrapper
      width="100%"
      height="100%"
      textAlign="center"
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="absolute"
      top="0"
      left="0"
      zIndex="1000"
      bgcolor="#fff"
      $isOpen={showSuccess}
    >
      <Box>
        {showSuccess && (
          <StyledChecks>
            <Check />
          </StyledChecks>
        )}

        <P16B>{t('Success')}</P16B>
        <P14 margin="8px 0 0 0" color=" #545A61">
          {t('Payment was successfully refunded.')}
        </P14>
      </Box>
    </StyledSuccessWrapper>
  );
};

SuccessScreen.propTypes = {
  showSuccess: PropTypes.bool.isRequired,
  toggleSuccessScreen: PropTypes.func.isRequired,
};

export default SuccessScreen;
