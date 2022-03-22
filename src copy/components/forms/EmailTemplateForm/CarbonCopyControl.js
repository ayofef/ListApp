import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import FormControl from '@material-ui/core/FormControl';
import { capitalize, Box } from '@material-ui/core';
import { StyledFormControlLabelBase } from '../_common/styled';
import { CHECKBOX_KEYS } from './constants';
import { Checkbox } from '../../atoms';

const CarbonCopyControl = ({ carbonControl, setCarbonControl }) => {
  const { t } = useTranslation();
  const { isSubmitting } = useFormikContext();
  const changeHandler = useCallback(
    ({ target: { name, checked } }) => setCarbonControl((prevState) => ({ ...prevState, [name]: checked })),
    [setCarbonControl]
  );

  return (
    <FormControl component="fieldset" fullWidth>
      {CHECKBOX_KEYS.map((key) => {
        const checked = carbonControl[key];
        return (
          <Box ml="6px" mb="8px" position="relative">
            <StyledFormControlLabelBase
              key={key}
              value={checked}
              disabled={isSubmitting}
              control={<Checkbox checked={checked} onChange={changeHandler} name={key} />}
              label={<Box ml="10px">{capitalize(t(key))}</Box>}
            />
          </Box>
        );
      })}
    </FormControl>
  );
};

CarbonCopyControl.propTypes = {
  carbonControl: PropTypes.shape({
    cc: PropTypes.bool.isRequired,
    bcc: PropTypes.bool.isRequired,
  }).isRequired,
  setCarbonControl: PropTypes.func.isRequired,
};

export default CarbonCopyControl;
