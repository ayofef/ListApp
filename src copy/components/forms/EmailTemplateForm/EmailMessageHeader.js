import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIosRounded';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { ButtonRounded as ButtonRoundedBase, H3 } from '../../atoms';
import { ButtonRounded } from './styled';

const EmailMessageHeader = ({ closeHandler }) => {
  const { t } = useTranslation();
  const { isValid, isSubmitting, dirty, handleSubmit } = useFormikContext();
  const isSubmitDisabled = isSubmitting || !isValid || !dirty;

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" pb="16px">
      <ButtonRounded
        type="button"
        variant="contained"
        color="secondary"
        startIcon={
          <Box color="#fff" mt="7px">
            <ArrowBackIosIcon fontSize="small" color="inherit" />
          </Box>
        }
        disabled={isSubmitting}
        onClick={closeHandler}
      >
        {t('Flow builder')}
      </ButtonRounded>

      <H3 fontWeight="600">{t('Email configuration')}</H3>

      <Box>
        <Grid container spacing={2}>
          {/* <Grid item>
            <ButtonRoundedBase type="button" variant="contained" color="secondary" disabled onClick={handleTest}>
              {t('Send test email')}
            </ButtonRoundedBase>
          </Grid> */}

          <Grid item>
            <ButtonRoundedBase
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitDisabled}
              onClick={handleSubmit}
            >
              {t('Save email')}
            </ButtonRoundedBase>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

EmailMessageHeader.propTypes = {
  closeHandler: PropTypes.func.isRequired,
};

export default EmailMessageHeader;
