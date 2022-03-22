import PropTypes from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';
import capitalize from '@material-ui/core/utils/capitalize';
import { useTranslation } from 'react-i18next/src/index';
import { P14, P16B } from '../../../../../components/atoms';
import THEME from '../../../../../constants/theme';
import { getCountryName } from '../../../../../utils/getCountryName';
import { COUNTRY_MAP } from '../../../../../constants/COUNTRY_ISO3';
import { PAYMENT_METHOD_ICON_MAP } from '../../../../../assets/icons/PaymentMethods';
import { UI_ROUTES } from '../../../../../constants/routes';
import Processor from '../../../../../components/table/Processor';
import { StyledTable, StyledCardTypeIcon } from '../../../../../components/GridSystem/styled';

const PaymentMethodBlock = ({ card }) => {
  const { t } = useTranslation();

  const CardIcon = PAYMENT_METHOD_ICON_MAP[card?.brand] ?? PAYMENT_METHOD_ICON_MAP.UNKNOWN_CARD;
  const countryIconKey = COUNTRY_MAP[card?.country];
  const countryName = getCountryName(card?.country);

  return (
    <Box component="section" mt="24px">
      <P16B>{t('Payment method')}</P16B>

      <StyledTable>
        <div>
          <P14 color={THEME.greyColors.grey1}>{t('ID')}</P14>
          <P14>{card.id}</P14>
        </div>

        <div>
          <P14 color={THEME.greyColors.grey1}>{t('Method')}</P14>
          <P14>{card.method || 'N/A'}</P14>
        </div>

        <div>
          <P14 color={THEME.greyColors.grey1}>{t('Brand')}</P14>
          <StyledCardTypeIcon>
            <span>
              <CardIcon />
            </span>
            <Box component="span" ml="8px">
              {card.brand && capitalize(card.brand)}
            </Box>
          </StyledCardTypeIcon>
        </div>

        <div>
          <P14 color={THEME.greyColors.grey1}>{t('Card Type')}</P14>
          {card.type && capitalize(card.type)}
        </div>

        <div>
          <P14 color={THEME.greyColors.grey1}>{t('Product Type')}</P14>
          <P14>{card.product}</P14>
        </div>

        <div>
          <P14 color={THEME.greyColors.grey1}>{t('Card Profile')}</P14>
          <P14>{card.profile || 'N/A'}</P14>
        </div>

        <div>
          <P14 color={THEME.greyColors.grey1}>{t('Issuing Bank')}</P14>
          <P14>{card.bankName || 'N/A'}</P14>
        </div>

        <div>
          <P14 color={THEME.greyColors.grey1}>{t('Issuing Country')}</P14>
          <Box display="flex" alignItems="center">
            <Processor
              logo={`${UI_ROUTES.countriesIcons}/${countryIconKey}.svg`}
              name={countryName}
              borderRadius="2px"
              size={16}
              matchRadius
            />
          </Box>
        </div>

        <div>
          <P14 color={THEME.greyColors.grey1}>{t('Number')}</P14>
          <P14>{card.number.replace('**** **** ****', t('ending in'))}</P14>
        </div>

        <div>
          <P14 color={THEME.greyColors.grey1}>{t('Token')}</P14>
          <P14>{card.token}</P14>
        </div>

        <div>
          <P14 color={THEME.greyColors.grey1}>{t('Expiry Date')}</P14>
          <P14>{`${card.expMonth}/${card.expYear}`}</P14>
        </div>
      </StyledTable>
    </Box>
  );
};

PaymentMethodBlock.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  card: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PaymentMethodBlock;
