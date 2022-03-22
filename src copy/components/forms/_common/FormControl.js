import React from 'react';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import capitalize from '@material-ui/core/utils/capitalize';
import { ButtonRounded } from '../../atoms';

const FormControl = ({ toggleIsOpen, primaryText, customIsSubmitDisabled }) => {
  const { t } = useTranslation();
  const { isSubmitting, isValid, handleSubmit } = useFormikContext();

  const isSubmitDisabled = customIsSubmitDisabled ?? (isSubmitting || !isValid);

  return (
    <>
      <ButtonRounded
        type="button"
        variant="contained"
        color="primary"
        disabled={isSubmitDisabled}
        onClick={handleSubmit}
      >
        {capitalize(t(primaryText) ?? '')}
      </ButtonRounded>

      <ButtonRounded
        type="button"
        color="secondary"
        variant="contained"
        disabled={customIsSubmitDisabled ? false : isSubmitting}
        onClick={toggleIsOpen}
      >
        {t('Cancel')}
      </ButtonRounded>
    </>
  );
};

FormControl.propTypes = {
  primaryText: PropTypes.string,
  toggleIsOpen: PropTypes.func.isRequired,
  customIsSubmitDisabled: PropTypes.bool,
};
FormControl.defaultProps = {
  primaryText: 'Save view',
  customIsSubmitDisabled: undefined,
};
export default FormControl;
