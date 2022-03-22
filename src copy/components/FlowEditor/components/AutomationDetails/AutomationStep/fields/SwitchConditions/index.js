import React from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import Skeleton from '@material-ui/lab/Skeleton';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useValidationMessage } from '../hooks';
import { useFlatFlowProperties } from './useFlatFlowProperties';
import { StyledFormControl } from './styled';
import Select, { NONE } from '../../../../../../forms/_common/Select';
import { useElementDataToSave } from '../hooks/useElementDataToSave';

const SwitchConditions = () => {
  const { t } = useTranslation();
  const [{ testProperty }, updateDataToSave] = useElementDataToSave();
  const { loading, flatProperties } = useFlatFlowProperties();

  const onChange = ({ target }) => {
    updateDataToSave({ testProperty: target.value, operator: 'EQUALS' });
  };

  const validationMessage = useValidationMessage('testProperty');

  return (
    <Box fontSize="16px" fontWeight="600" display="flex" alignItems="center" mb={1}>
      <Box>{t('If')}&nbsp;&nbsp;</Box>
      <Box width="110px" flexShrink="0" flexGrow={1}>
        <StyledFormControl fullWidth error={!!validationMessage}>
          {loading ? (
            <Skeleton height="30px" />
          ) : (
            <Select value={testProperty ?? NONE} name="testProperty" options={flatProperties} onChange={onChange} />
          )}
          <FormHelperText>{validationMessage}</FormHelperText>
        </StyledFormControl>
      </Box>
      <Box>&nbsp;&nbsp;{t('is')}</Box>
    </Box>
  );
};

export default SwitchConditions;
