import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { H3, L14, ButtonRounded } from '../../../../components/atoms';
import { EmptyBackdrop, ModalWrapper } from './styled';
import { usePaymentFlowContext } from '../../paymentFlowContext';

const DESC =
  'Head over to Settings to configure your payment flow so we know where to send your payments and how your users will be checking out';

const EmptyState = () => {
  const { t } = useTranslation();
  const { flowId } = usePaymentFlowContext();

  return (
    <EmptyBackdrop>
      <ModalWrapper>
        <Box mb="24px" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <H3>{t('Nothing here yet.')}</H3>
          <L14 noHover textAlign="center">
            {t(DESC)}
          </L14>
        </Box>
        <ButtonRounded component={Link} to={`/flows/${flowId}/details/settings`} variant="contained" color="primary">
          {t('Go to settings')}
        </ButtonRounded>
      </ModalWrapper>
    </EmptyBackdrop>
  );
};

export default EmptyState;
