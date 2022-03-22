import PropTypes from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useTranslation } from 'react-i18next';
import { useField } from 'formik';

import { useFormStyle } from '../formStyles';

import { L12, Checkbox } from '../../atoms';

const AcceptNewsletter = ({ name }) => {
  const [{ value }, , { setValue }] = useField(name);
  const { t } = useTranslation();
  const classes = useFormStyle();

  const handleOnChange = () => {
    setValue(!value, true);
  };

  return (
    <FormControlLabel
      classes={classes}
      control={
        <Box mr="16px" ml="8px">
          <Checkbox
            transform="scale(1.5) translateX(-0.4px)"
            width="24px"
            height="24px"
            name={name}
            checked={value}
            onChange={handleOnChange}
          />
        </Box>
      }
      label={<L12 display="inline">{t('Agree to receive future communications from WhenThen.')}</L12>}
      onKeyPress={handleOnChange}
    />
  );
};

AcceptNewsletter.propTypes = {
  name: PropTypes.string.isRequired,
};

export default AcceptNewsletter;
