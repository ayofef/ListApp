import React, { useCallback } from 'react';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Skeleton from '@material-ui/lab/Skeleton';
import { useFlatFlowProperties } from '../../useFlatFlowProperties';
import { useActionInputContext } from '../actionInputContext';
import PropertyTextEditor from '../../../../../../../PropertyTextEditor';
import THEME from '../../../../../../../../constants/theme';

const TextPropertyInput = () => {
  const {
    actionId,
    fieldValue,
    fieldType,
    validationMessage,
    setInputField,
    placeholder,
    fieldId,
  } = useActionInputContext();

  const selectTypes = useCallback(() => {
    if (fieldType) {
      return fieldId === 'message-text' && actionId?.includes('slack') ? [fieldType, 'FILE'] : [fieldType];
    }
    return null;
  }, [actionId, fieldId, fieldType]);

  const { getAvailableProperties, loading } = useFlatFlowProperties(selectTypes());

  const hasError = Boolean(validationMessage);
  const border = `1px solid ${hasError ? THEME.secondaryColors.invalid : '#C1C3C6'}`;

  return (
    <Box position="relative">
      <FormControl fullWidth error={hasError}>
        {loading ? (
          <Box p="12px 16px" borderRadius="8px" bgcolor="#f8f9f9" border={border}>
            <Skeleton height="32px" />
          </Box>
        ) : (
          <PropertyTextEditor
            initialEditorText={fieldValue || placeholder}
            border={border}
            handleSavePlainText={setInputField}
            properties={getAvailableProperties}
            showToolbar={false}
            minHeight={fieldType === 'LONG_STRING' ? '100px' : 'none'}
            type={fieldType}
          />
        )}

        {hasError && <FormHelperText>{validationMessage}</FormHelperText>}
      </FormControl>
    </Box>
  );
};

export default TextPropertyInput;
