import PropTypes from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next/src/index';
import CircleImage from '../../../../../components/table/CircleImage';
import { P14, P16B } from '../../../../../components/atoms';
import THEME from '../../../../../constants/theme';
import { getCountryName } from '../../../../../utils/getCountryName';
import { COUNTRY_MAP } from '../../../../../constants/COUNTRY_ISO3';
import { UI_ROUTES } from '../../../../../constants/routes';
import Processor from '../../../../../components/table/Processor';
import { StyledTable } from '../../../../../components/GridSystem/styled';

const CustomerBlock = ({ customer }) => {
  const { t } = useTranslation();

  const countryIconKey = COUNTRY_MAP[customer.billingAddress?.country];
  const countryName = getCountryName(customer.billingAddress?.country);

  return (
    <Box component="section">
      <P16B>{t('Customer')}</P16B>
      <StyledTable>
        <div>
          <P14 color={THEME.greyColors.grey1}>{t('Name')}</P14>
          <Box display="flex" alignItems="center">
            <CircleImage
              bgColor="#E6E9EC"
              color="#232629"
              text={customer?.name ?? t('Guest')}
              textOnly
              size={20}
              fontSize="10px"
              margin="0 8px 0 0"
            />
            <P14>{customer.name || 'N/A'}</P14>
          </Box>
        </div>

        <div>
          <P14 color={THEME.greyColors.grey1}>{t('Email')}</P14>
          <P14>{customer.email || 'N/A'}</P14>
        </div>

        <div>
          <P14 color={THEME.greyColors.grey1}>{t('Phone')}</P14>
          <P14>{customer.phone || 'N/A'}</P14>
        </div>

        <div>
          <P14 color={THEME.greyColors.grey1}>{t('Location')}</P14>
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
      </StyledTable>
    </Box>
  );
};

CustomerBlock.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  customer: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default CustomerBlock;
