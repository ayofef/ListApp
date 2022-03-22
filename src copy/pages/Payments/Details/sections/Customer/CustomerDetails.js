import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next/src/index';
import reduceValue from '../../_utils/reduceValue';
import { P14 } from '../../../../../components/atoms';
import THEME from '../../../../../constants/theme';

const CustomerDetails = ({ data }) => {
  const { t } = useTranslation();
  const { email, phone } = useMemo(() => {
    const paymentCustomer = Array.isArray(data.value) ? reduceValue(data.value) : data;

    return {
      logo: '', // TODO: no value
      email: paymentCustomer?.email || 'N/A',
      phone: paymentCustomer?.phone || 'N/A',
      paymentMethod: paymentCustomer?.preferredPaymentMethod || 'N/A',
      lastTransaction: paymentCustomer?.lastTransaction || 'N/A',
      customValue: paymentCustomer?.customerValue?.formattedAmount || 'N/A',
    };
  }, [data]);

  return (
    <>
      <div>
        <P14 color={THEME.greyColors.grey1}>{t('Email')}</P14>
        <P14>{email || 'N/A'}</P14>
      </div>

      <div>
        <P14 color={THEME.greyColors.grey1}>{t('Phone')}</P14>
        <P14>{phone || 'N/A'}</P14>
      </div>
    </>
  );
};

CustomerDetails.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.arrayOf(PropTypes.shape({}))]),
  }).isRequired,
};

export default CustomerDetails;
