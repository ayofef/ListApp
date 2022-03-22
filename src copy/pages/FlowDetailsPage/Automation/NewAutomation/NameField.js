import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';
import { useField } from 'formik';
import { useTranslation } from 'react-i18next';
import { StyledInput } from '../../../../components/forms/_common/CustomField/styled';
import { P14B } from '../../../../components/atoms';

const NameField = () => {
  const { t } = useTranslation();
  const [{ value, onChange }] = useField('automationName');

  return (
    <Box pb="8px" mt="20px">
      <P14B> {t('Automation name')}</P14B>
      <Box maxWidth="400px" mt="10px">
        <FormControl variant="outlined" size="small" fullWidth>
          <StyledInput value={value} onChange={onChange} name="automationName" type="text" fullWidth />
        </FormControl>
      </Box>
    </Box>
  );
};

export default NameField;
