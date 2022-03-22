import React from 'react';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { ButtonRounded } from '../../../components/atoms';
import { StyledDialogActions } from './styled';

const DialogActions = ({ handleClose }) => {
  const { t } = useTranslation();
  const { isSubmitting, submitForm } = useFormikContext();

  return (
    <StyledDialogActions>
      <ButtonRounded type="submit" color="primary" variant="contained" disabled={isSubmitting} onClick={submitForm}>
        {t('Export')}
      </ButtonRounded>
      <ButtonRounded type="button" variant="contained" color="secondary" disabled={isSubmitting} onClick={handleClose}>
        {t('Cancel')}
      </ButtonRounded>
    </StyledDialogActions>
  );
};

DialogActions.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default DialogActions;
