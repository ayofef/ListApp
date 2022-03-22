import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box/index';
import { useTranslation } from 'react-i18next/src/index';
import Processor from '../../../../../components/table/Processor';
import reduceValue from '../../_utils/reduceValue';
import CustomerDetails from './CustomerDetails';
import { P14, P16B } from '../../../../../components/atoms';
import { StyledTable } from '../../../../../components/GridSystem/styled';
import THEME from '../../../../../constants/theme';
import { isDefined } from '../../../../../utils/helpers';

const GUEST_CUSTOMER = 'Guest';

const Customer = ({ data }) => {
  const { t } = useTranslation();
  const { name, logo } = useMemo(() => {
    const paymentCustomer = Array.isArray(data.value) ? reduceValue(data.value) : data;

    return {
      name:
        isDefined(paymentCustomer.name) && isDefined(paymentCustomer.email)
          ? paymentCustomer.name || GUEST_CUSTOMER
          : GUEST_CUSTOMER,
    };
  }, [data]);

  return (
    <Box component="section" mt="40px">
      <P16B>{t('Customer')}</P16B>

      <StyledTable>
        <div>
          <P14 color={THEME.greyColors.grey1}>{t('Name')}</P14>
          <Box display="flex" alignItems="center">
            <Processor logo={logo} name={name} size={20} />
          </Box>
        </div>
        {name !== GUEST_CUSTOMER && <CustomerDetails data={data} />}
      </StyledTable>
    </Box>
  );
};

Customer.propTypes = {
  data: PropTypes.shape({
    value: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        value: PropTypes.string,
      })
    ),
    location: PropTypes.string,
  }).isRequired,
};

export default Customer;
