import PropTypes from 'prop-types';
import React, { useRef, useCallback } from 'react';
import { useField } from 'formik';
import { useTranslation } from 'react-i18next';
import { normalizeExpired } from './constant';
import { InputField, P } from '../../../../../components/atoms';
import { Label, Error } from '../../../../../components/forms/_common/Input';
import THEME from '../../../../../constants/theme';

const ExpiryInput = ({ expiry, customLabelProps }) => {
  const { t } = useTranslation();

  const [{ value: fieldValue, onBlur }, { error, touched }, { setValue }] = useField(expiry);
  const expiryPrevValue = useRef('');

  const handleChange = useCallback(
    (event) => {
      const { value } = event.target;

      if (value.length < expiryPrevValue.current.length) {
        expiryPrevValue.current = value;

        setValue(value);
        return;
      }

      const val = normalizeExpired(value);
      expiryPrevValue.current = val;
      setValue(val);
    },
    [setValue]
  );

  return (
    <Label>
      <P
        fontSize="12px !important"
        fontWeight={600}
        width="100%"
        textAlign="left"
        lineHeight="30px"
        {...(customLabelProps && customLabelProps)}
      >
        {t('Expiry date')}
      </P>
      <InputField
        name={expiry}
        label=""
        type="text"
        variant="outlined"
        value={fieldValue}
        onChange={handleChange}
        placeholder="MM/YYYY"
        onBlur={onBlur}
      />
      {touched && error && <Error color={THEME.secondaryColors.danger}>{error}</Error>}
    </Label>
  );
};

ExpiryInput.propTypes = {
  customLabelProps: PropTypes.shape({}).isRequired,
  expiry: PropTypes.string.isRequired,
};

export default ExpiryInput;
