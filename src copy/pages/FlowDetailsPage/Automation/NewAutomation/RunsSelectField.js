import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';
import { useField } from 'formik';
import { useTranslation } from 'react-i18next';
import { P14B, StyledSelect } from '../../../../components/atoms';
import { OPTIONS } from './formSettings';

const RunsSelectField = () => {
  const { t } = useTranslation();
  const [{ value, onChange }] = useField('parentType');

  return (
    <Box pb="8px" mt="20px">
      <P14B> {t('Run during')}</P14B>
      <Box maxWidth="400px">
        <FormControl variant="outlined" size="small" fullWidth>
          <StyledSelect value={value} name="parentType" onChange={onChange} options={OPTIONS} />
        </FormControl>
      </Box>
    </Box>
  );
};

export default RunsSelectField;
