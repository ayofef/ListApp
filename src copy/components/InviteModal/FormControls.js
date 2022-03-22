import PropTypes from 'prop-types';
import React from 'react';
import { useFormikContext } from 'formik';

import FormControl from '../forms/_common/FormControl';

const FormControls = ({ toggleIsOpen }) => {
  const { dirty, isValid, isSubmitting } = useFormikContext();
  const customDisable = !dirty || !isValid || isSubmitting;

  return <FormControl primaryText="invite" toggleIsOpen={toggleIsOpen} customIsSubmitDisabled={customDisable} />;
};

FormControls.propTypes = {
  toggleIsOpen: PropTypes.func.isRequired,
};

export default FormControls;
