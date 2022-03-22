import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { capitalize } from '@material-ui/core';
import { Checkbox } from '../../atoms';
import { StyledInputGroup } from './styled';

const InputCheckbox = ({ name, handleChange, checked }) => {
  const { t } = useTranslation();
  return (
    <StyledInputGroup htmlFor={name}>
      <Checkbox
        type="checkbox"
        id={name}
        name={name}
        value={checked}
        checked={checked}
        onChange={(e) => handleChange(e)}
      />
      {t(capitalize(name))}
    </StyledInputGroup>
  );
};

InputCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default InputCheckbox;
