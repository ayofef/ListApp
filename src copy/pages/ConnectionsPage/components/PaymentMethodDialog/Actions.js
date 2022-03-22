import PropTypes from 'prop-types';
import React from 'react';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { ButtonRounded, CircularLoader } from '../../../../components/atoms';

const Actions = ({ toggleIsOpen }) => {
  const { t } = useTranslation();
  const { isValid, isSubmitting, handleSubmit } = useFormikContext();

  const disabled = !isValid || isSubmitting;

  return (
    <>
      <ButtonRounded type="button" color="secondary" variant="contained" onClick={toggleIsOpen}>
        {t('Close')}
      </ButtonRounded>
      <ButtonRounded type="button" color="primary" variant="contained" onClick={handleSubmit} disabled={disabled}>
        {isSubmitting ? <CircularLoader size={20} bgcolor="#fff" /> : t('Continue')}
      </ButtonRounded>{' '}
    </>
  );
};

Actions.propTypes = {
  toggleIsOpen: PropTypes.func.isRequired,
};

export default Actions;
