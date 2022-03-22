import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import isEmpty from 'lodash/isEmpty';
import qs from 'qs';
import omit from 'lodash/omit';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import capitalize from '@material-ui/core/utils/capitalize';
import { ButtonRounded } from '../../../components/atoms/Buttons/ButtonRounded';
import useSearch, { STRINGIFY_OPTIONS } from '../../../hooks/useSearch';

const FormControl = ({ customIsClearDisabled }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { isSubmitting, dirty, isValid, initialValues } = useFormikContext();

  const [searchParams] = useSearch();

  const handleClearFilter = useCallback(() => {
    // clean up search from location based on the filter keys
    const newSearchFilter = {
      ...searchParams,
      filter: {
        ...omit(searchParams?.filter || {}, Object.keys(initialValues)),
      },
    };

    const { location } = history;

    history.push({ ...location, search: `?${qs.stringify(newSearchFilter, STRINGIFY_OPTIONS)}` ?? undefined });
  }, [history, searchParams, initialValues]);

  const isSubmitDisabled = !dirty || isSubmitting || !isValid;
  const isClearDisabled = customIsClearDisabled || isEmpty(searchParams?.filter);

  return (
    <>
      <Box mt="auto">
        <Divider light />
      </Box>

      <Box m="16px" padding="0 4px">
        <Grid container spacing={2}>
          <Grid item>
            <ButtonRounded type="submit" variant="contained" color="primary" disabled={isSubmitDisabled}>
              {capitalize(t('apply filter'))}
            </ButtonRounded>
          </Grid>

          <Grid item>
            <ButtonRounded variant="contained" color="secondary" disabled={isClearDisabled} onClick={handleClearFilter}>
              {capitalize(t('clear filter'))}
            </ButtonRounded>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

FormControl.propTypes = {
  customIsClearDisabled: PropTypes.bool,
};
FormControl.defaultProps = {
  customIsClearDisabled: false,
};

export default FormControl;
