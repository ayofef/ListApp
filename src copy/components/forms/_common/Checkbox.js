import React from 'react';
import { useField, useFormikContext } from 'formik';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PropTypes from 'prop-types';

import { CustomCheckbox, L12 } from '../../atoms';
import THEME from '../../../constants/theme';
import { useFormStyle } from '../formStyles';
import { formStyle } from './styled';

const Checkbox = ({ name, label }) => {
  const classes = useFormStyle();
  const { isSubmitting } = useFormikContext();
  const [{ value, onChange, onBlur }, { touched, error }] = useField(name);

  const showError = touched && error;
  return (
    <>
      <FormControlLabel
        classes={classes}
        control={<CustomCheckbox name={name} value={value} checked={value} onChange={onChange} />}
        label={label}
        onBlur={onBlur}
        disabled={isSubmitting}
        style={formStyle}
      />

      {showError && (
        <L12 data-cy="error" margin="0px 0 4px 34px" color={THEME.secondaryColors.danger}>
          {error}
        </L12>
      )}
    </>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.element,
};

Checkbox.defaultProps = {
  label: null,
};

export default Checkbox;
