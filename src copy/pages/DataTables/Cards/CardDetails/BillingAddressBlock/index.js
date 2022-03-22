import React from 'react';
import Box from '@material-ui/core/Box';
import { shape, string } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { P14, P16B } from '../../../../../components/atoms';
import THEME from '../../../../../constants/theme';
import { StyledTable } from '../../../../../components/GridSystem/styled';

const BillingAddressBlock = ({ billingAddress }) => {
  const { t } = useTranslation();

  return (
    <Box component="section" mt="54px">
      <P16B>{t('settings.billing.billinDetails.title2')}</P16B>
      <StyledTable>
        <div>
          <P14 color={THEME.greyColors.grey1}>{t('settings.billing.billinDetails.fullName')}</P14>
          <P14>{billingAddress.name || 'N/A'}</P14>
        </div>

        <div>
          <P14 color={THEME.greyColors.grey1}>{t('settings.billing.billinDetails.company')}</P14>
          <P14>{billingAddress.company || 'N/A'}</P14>
        </div>

        <div>
          <P14 color={THEME.greyColors.grey1}>{t('settings.billing.billinDetails.street')}</P14>
          <P14>{billingAddress['address line 1'] || 'N/A'}</P14>
        </div>

        <div>
          <P14 color={THEME.greyColors.grey1}>{t('settings.billing.billinDetails.city')}</P14>
          <P14>{billingAddress.city || 'N/A'}</P14>
        </div>

        <div>
          <P14 color={THEME.greyColors.grey1}>{t('settings.billing.billinDetails.country')}</P14>
          <P14>{billingAddress.country || 'N/A'}</P14>
        </div>

        <div>
          <P14 color={THEME.greyColors.grey1}>{t('settings.billing.billinDetails.description')}</P14>
          <P14>{billingAddress.description || 'N/A'}</P14>
        </div>
      </StyledTable>
    </Box>
  );
};

BillingAddressBlock.propTypes = {
  billingAddress: shape({
    name: string.isRequired,
    company: string.isRequired,
    'address line 1': string.isRequired,
    city: string.isRequired,
    country: string.isRequired,
    description: string.isRequired,
  }).isRequired,
};

export default BillingAddressBlock;
