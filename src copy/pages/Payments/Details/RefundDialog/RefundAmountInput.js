import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik';

import { P14 } from '../../../../components/atoms';
import Input from '../../../../components/forms/_common/Input';
import THEME from '../../../../constants/theme';
import { normalize } from './formSettings';

const LAPEL_PROPS = {
  fontWeight: '600 !important',
  fontSize: '12px',
  lineHeight: '12px',
};

const RefundAmountInput = ({ currency }) => {
  const [focused, setFocused] = useState(false);
  const toggleFocused = useCallback(() => setFocused((prevState) => !prevState), []);
  const { t } = useTranslation();
  const color = useMemo(() => (focused ? THEME.primaryColors.primary : THEME.greyColors.grey1), [focused]);
  const {
    values: { fullRefund },
  } = useFormikContext();

  // NOTE: API doesn't expose raw amount, so hide input when full amount is checked.
  // Revert to display read-only input when API with raw amount will be available.
  if (fullRefund) {
    return null;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      mt="24px"
      onFocus={toggleFocused}
      onBlur={toggleFocused}
    >
      <Input
        inputColor={THEME.greyColors.grey1}
        name="amount"
        type="text"
        width="100%"
        label={t('Amount')}
        customLabel
        customLabelProps={LAPEL_PROPS}
        normalize={normalize}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {currency && (
                <P14 fontWeight="500" color={color}>
                  {currency}
                </P14>
              )}
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

RefundAmountInput.propTypes = {
  currency: PropTypes.string,
};

RefundAmountInput.defaultProps = {
  currency: '',
};

export default RefundAmountInput;
