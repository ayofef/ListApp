import PropTypes from 'prop-types';
import React from 'react';
import PhoneInput from 'react-phone-input-2';
import { useField } from 'formik';
import { useTranslation } from 'react-i18next';

import { P12 } from '../../../../components/atoms';
import { StyledPhoneInput } from './styled';

const PhoneInputComponent = ({ name, ...rest }) => {
  const { t } = useTranslation();

  const [phoneField, , { setValue }] = useField(name);

  const handleChange = (value) => {
    setValue(value);
  };

  return (
    <StyledPhoneInput>
      <P12 fontWeight="600" margin="0 0 8px">
        {t('Phone')}
      </P12>
      <PhoneInput
        country="us"
        isValid={() => {}}
        value={phoneField.value}
        onChange={handleChange}
        inputProps={{
          name,
        }}
        {...rest}
      />
    </StyledPhoneInput>
  );
};

PhoneInputComponent.propTypes = {
  name: PropTypes.string.isRequired,
};

export default PhoneInputComponent;
