import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { ButtonRounded } from '../../atoms';
import TestButton from './TestButton';

const FormControl = ({ toggleIsOpen }) => {
  const { t } = useTranslation();
  const { isSubmitting, isValid, handleSubmit, status } = useFormikContext();
  const isSubmitDisabled = isSubmitting || !isValid || status === 'testing';

  return (
    <Box display="flex" width="100%">
      <Box mr="8px">
        <ButtonRounded
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
        >
          {t('Save')}
        </ButtonRounded>
      </Box>

      <ButtonRounded type="button" color="secondary" variant="contained" disabled={isSubmitting} onClick={toggleIsOpen}>
        {t('Cancel')}
      </ButtonRounded>

      <Box ml="auto">
        <TestButton />
      </Box>
    </Box>
  );
};

FormControl.propTypes = {
  toggleIsOpen: PropTypes.func.isRequired,
};

export default FormControl;
