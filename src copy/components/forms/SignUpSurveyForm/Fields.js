import PropTypes from 'prop-types';
import React from 'react';
import { useField, useFormikContext } from 'formik';
import { CustomCheckbox, P12 } from '../../atoms';
import { useFormStyle } from '../formStyles';
import { formStyle } from '../_common/styled';
import { OPTIONS } from './formSettings';
import { StyledFormControlLabel } from './styled';

const FieldSet = ({ name }) => {
  const classes = useFormStyle();
  const { isSubmitting } = useFormikContext();
  const [{ value, onChange }, { error }] = useField(name);

  return (
    <>
      {OPTIONS.map((option) => (
        <StyledFormControlLabel
          key={option?.value}
          classes={classes}
          control={
            <CustomCheckbox
              name={name}
              value={option?.value}
              checked={value?.includes(option?.value)}
              onChange={onChange}
              white
            />
          }
          label={<P12 lineHeight="22px">{option?.label}</P12>}
          disabled={isSubmitting}
          style={formStyle}
        />
      ))}
      {error && (
        <P12 color="#DF5B5B" margin="16px 0 0 0 ">
          {error[0]}
        </P12>
      )}
    </>
  );
};

FieldSet.propTypes = {
  name: PropTypes.string.isRequired,
};

export default FieldSet;
