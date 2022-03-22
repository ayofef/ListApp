import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { PowerUp } from '../../../assets/icons/FlowList';
import { ButtonRounded, P, P14B } from '../../../components/atoms';
import { usePaymentFlowContext } from '../paymentFlowContext';

const PowerUpCard = ({ heading, description }) => {
  const { t } = useTranslation();
  const { togglePremiumDialog } = usePaymentFlowContext();

  return (
    <Box
      width="300px"
      minHeight="232px"
      p="24px 24px 16px 24px"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      borderRadius="8px"
      boxShadow="0px 0px 3px  rgba(0, 0, 0, 0.12)"
      mr="20px"
      boxSizing="border-box"
      mb="24px"
    >
      <Box>
        <Box
          bgcolor="#F5F2FF"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="40px"
          height="40px"
          borderRadius="50%"
          mb="16px"
        >
          <PowerUp />
        </Box>
        <P14B margin="0 0 8px 0">{heading}</P14B>
        <P lineHeight="20px" fontSize="13px" color="#787F88">
          {description}
        </P>
      </Box>
      <Box mt="23px" ml="-10px">
        <ButtonRounded onClick={togglePremiumDialog} type="text" color="primary">
          {t('Setup')}
        </ButtonRounded>
      </Box>
    </Box>
  );
};

PowerUpCard.propTypes = {
  description: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
};

export default PowerUpCard;
