import PropTypes from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { OTHERS_VALUE, RENDER_VALUE_MAP, OTHERS_INPUT_NAME_MAP } from './consts';

import Input from '../_common/Input';
import CustomSelect from './CustomSelect';

const SelectWithOthers = ({ name, label, ...rest }) => {
  const { t } = useTranslation();

  const { values } = useFormikContext();
  const showOtherInput = values[name]?.includes(OTHERS_VALUE);

  return (
    <>
      <CustomSelect name={name} label={label} multiple renderValue={RENDER_VALUE_MAP[name]} {...rest} />
      {showOtherInput && (
        <Box mt="-8px">
          <Input type="text" name={OTHERS_INPUT_NAME_MAP[name]} label="" placeholder={t('Please specify')} />
        </Box>
      )}
    </>
  );
};

SelectWithOthers.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default SelectWithOthers;
