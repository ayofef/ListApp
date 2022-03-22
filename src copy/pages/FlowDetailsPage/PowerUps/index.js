import React, { useContext } from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { P16B, P14 } from '../../../components/atoms';
import PowerUpCard from '../Components/PowerUpCard';
import PowerUpLoadingState from '../Components/PowerUpLoadingState';
import { PaymentFlowContext } from '../paymentFlowContext';

const HEADING = 'Essential';
const DESCRIPTION = 'Maximize your payment flow experience with power-ups.';

const PowerUps = () => {
  const { t } = useTranslation();
  const { flow, loading } = useContext(PaymentFlowContext);

  return (
    <Box px="32px" pb="100px">
      <P16B margin="0 0 7px 0">{t(HEADING)}</P16B>
      <P14 color="#787F88">{t(DESCRIPTION)}</P14>
      <Box display="flex" mt="32px" width="100%" boxSizing="border-box" flexWrap="wrap">
        {loading && <PowerUpLoadingState num={6} />}

        {!loading &&
          flow?.powerups?.map((powerup) => (
            <PowerUpCard key={powerup?.title} heading={powerup?.title} description={powerup?.blurb} />
          ))}
      </Box>
    </Box>
  );
};

export default PowerUps;
