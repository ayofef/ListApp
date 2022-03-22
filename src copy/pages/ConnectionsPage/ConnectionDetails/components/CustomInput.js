import React, { useCallback, useMemo, useState } from 'react';
import { func, oneOf, string } from 'prop-types';
import InputAdornment from '@material-ui/core/InputAdornment';
import Box from '@material-ui/core/Box';
import Input from '../../../../components/forms/_common/Input';
import THEME from '../../../../constants/theme';
import { normalize } from '../../../Payments/Details/RefundDialog/formSettings';
import { P14 } from '../../../../components/atoms';

const LABEL_PROPS = {
  fontWeight: '600 !important',
  fontSize: '12px',
  lineHeight: '12px',
};

const CustomInput = ({ currency, width, inputWidth, name, label, m, onBlur }) => {
  const [focused, setFocused] = useState(false);
  const toggleFocused = useCallback(() => setFocused((prevState) => !prevState), []);
  const color = useMemo(() => (focused ? THEME.primaryColors.primary : THEME.greyColors.grey1), [focused]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      m={m}
      width={width}
      onFocus={toggleFocused}
      onBlur={(e) => {
        toggleFocused();
        onBlur(e);
      }}
    >
      <Input
        name={name}
        type="text"
        label={label}
        customLabel
        customLabelProps={LABEL_PROPS}
        customErrorProps={{
          margin: '8px 0 0 0 !important',
        }}
        normalize={normalize}
        margin="8px 0 0"
        padding="4px 16px 8px"
        width={inputWidth}
        skipError
        InputProps={
          currency && {
            endAdornment: (
              <InputAdornment position="end">
                <P14 fontWeight="500" color={color}>
                  {currency}
                </P14>
              </InputAdornment>
            ),
          }
        }
      />
    </Box>
  );
};

CustomInput.propTypes = {
  name: string.isRequired,
  currency: oneOf([string, null]),
  width: string,
  label: oneOf([string, null]),
  m: string,
  onBlur: func,
  inputWidth: string,
};

CustomInput.defaultProps = {
  currency: null,
  width: '100%',
  label: null,
  m: '0',
  onBlur: () => {},
  inputWidth: undefined,
};

export default CustomInput;
