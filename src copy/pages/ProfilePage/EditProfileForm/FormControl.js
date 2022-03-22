import React from 'react';
import { bool } from 'prop-types';
import { useFormikContext } from 'formik';
import { ButtonRounded } from '../../../components/atoms';

const FormControl = ({ loading, getMeLoading, children }) => {
  const { isSubmitting, isValid, handleSubmit } = useFormikContext();
  const isSubmitDisabled = isSubmitting || !isValid || loading || getMeLoading;

  return (
    <ButtonRounded
      type="button"
      variant="contained"
      color="primary"
      disabled={isSubmitDisabled}
      onClick={handleSubmit}
      padding="10px 18px"
    >
      {children}
    </ButtonRounded>
  );
};

FormControl.propTypes = {
  loading: bool,
  getMeLoading: bool.isRequired,
};

FormControl.defaultProps = {
  loading: false,
};

export default FormControl;
