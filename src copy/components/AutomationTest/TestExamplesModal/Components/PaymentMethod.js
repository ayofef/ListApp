import PropTypes from 'prop-types';
import React from 'react';

import Box from '@material-ui/core/Box';
import { PAYMENT_METHOD_ICON_MAP } from '../../../../assets/icons/PaymentMethods';

const PaymentMethod = ({ value }) => {
  const Icon = PAYMENT_METHOD_ICON_MAP[value] ?? PAYMENT_METHOD_ICON_MAP.UNKNOWN_CARD;
  return (
    <Box display="flex" justifyContent="flex-start" alignItems="center">
      <Box component="span">
        <Icon />
      </Box>
      <Box component="span" mb="4px" ml="8px">
        {value?.toUpperCase()}
      </Box>
    </Box>
  );
};

PaymentMethod.propTypes = {
  value: PropTypes.string.isRequired,
};

export default PaymentMethod;
