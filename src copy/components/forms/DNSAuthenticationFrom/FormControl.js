import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik';
import Box from '@material-ui/core/Box';
import CallMadeIcon from '@material-ui/icons/CallMade';
import { ButtonRounded } from '../../atoms';
import { StyledButton } from './styled';

const FormControl = ({ toggleIsOpen }) => {
  const { t } = useTranslation();
  const { isSubmitting, isValid, handleSubmit } = useFormikContext();
  const isSubmitDisabled = isSubmitting || !isValid;

  return (
    <Box display="flex" width="100%" alignItems="center">
      <Box display="flex">
        <Box mr="8px">
          <ButtonRounded
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
          >
            {t('Verify authentication')}
          </ButtonRounded>
        </Box>

        <ButtonRounded
          type="button"
          color="secondary"
          variant="contained"
          disabled={isSubmitting}
          onClick={toggleIsOpen}
        >
          {t('Cancel')}
        </ButtonRounded>
      </Box>
      <Box color="#787F88" ml="auto">
        <StyledButton variant="text" color="inherit" size="small" endIcon={<CallMadeIcon fontSize="inherit" />}>
          {t('Need help? Get instructions here.')}
        </StyledButton>
      </Box>
    </Box>
  );
};

FormControl.propTypes = {
  toggleIsOpen: PropTypes.func.isRequired,
};

export default FormControl;
