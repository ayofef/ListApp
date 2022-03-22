import React, { useContext } from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { P16B, P14 } from '../../../../components/atoms';
import PowerUpCard from '../../Components/PowerUpCard';
import PowerUpLoadingState from '../../Components/PowerUpLoadingState';
import { PaymentFlowContext } from '../../paymentFlowContext';

const HEADING = 'Power up your payment flow';
const DESCRIPTION = 'Follow these steps to power up your payment flow.';

const PowerUpSection = () => {
  const { t } = useTranslation();
  const { flow, loading } = useContext(PaymentFlowContext);

  return (
    <Box px="32px" mt="28px">
      <P16B margin="0 0 7px 0">{t(HEADING)}</P16B>
      <P14 color="#787F88">{t(DESCRIPTION)}</P14>
      <Box display="flex" mt="32px">
        {loading && <PowerUpLoadingState num={3} />}

        {!loading &&
          flow?.powerups
            ?.slice(0, 3) //max on overview is 3
            ?.map((powerup) => (
              <PowerUpCard key={powerup?.title} heading={powerup?.title} description={powerup?.blurb} />
            ))}
      </Box>
    </Box>
  );
};

export default PowerUpSection;
