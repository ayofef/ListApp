import PropTypes from 'prop-types';
import React from 'react';
import { useFormikContext } from 'formik';
import Box from '@material-ui/core/Box';

import Button from '../../atoms/Button';
import CircularLoader from '../../atoms/CircularLoader';

function SubmitButton({ loading, label }) {
  const { isSubmitting, isValid, handleSubmit } = useFormikContext();

  const isSubmitDisabled = loading || isSubmitting || !isValid;

  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      onClick={handleSubmit}
      fontWeight="600"
      disabled={isSubmitDisabled}
    >
      {loading ? (
        <Box mt="8px">
          <CircularLoader bgcolor="#fff" size="20px" />
        </Box>
      ) : (
        label
      )}
    </Button>
  );
}

SubmitButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};

export default SubmitButton;
