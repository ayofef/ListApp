import PropTypes from 'prop-types';
import React, { useMemo, useCallback } from 'react';
import Box from '@material-ui/core/Box';
import { useField } from 'formik';
import { getPaymentMethodsOption } from '../../../../utils/generatePaymentMethodOptions';
import PaymentMethodItem from './PaymentMethodItem';

const PaymentMethods = ({ supportedPaymentMethods, name }) => {
  const [{ value: fieldValue }, , { setValue }] = useField(name);

  const options = useMemo(() => getPaymentMethodsOption(supportedPaymentMethods ?? []) ?? [], [
    supportedPaymentMethods,
  ]);

  const handleSwitch = useCallback(
    (value) => {
      const getValue = fieldValue?.includes(value)
        ? fieldValue.filter((el) => el !== value)
        : [...new Set([...fieldValue, value])];

      setValue(getValue, true);
    },
    [setValue, fieldValue]
  );

  return (
    <Box width="100%">
      {options?.map((option) => (
        <Box mb="32px">
          <PaymentMethodItem
            key={option?.value}
            option={option}
            handleSwitch={handleSwitch}
            selectedMethods={fieldValue || []}
          />
        </Box>
      ))}
    </Box>
  );
};

PaymentMethods.propTypes = {
  name: PropTypes.string.isRequired,
  supportedPaymentMethods: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PaymentMethods;
