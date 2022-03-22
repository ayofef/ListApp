import React from 'react';
import Box from '@material-ui/core/Box';
import { string } from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Skeleton from '@material-ui/lab/Skeleton';
import Title from '../../Title';
import PropertyTextEditor from '../../../../../PropertyTextEditor';
import { useValidationMessage, useFlowPropertiesList } from './hooks';
import THEME from '../../../../../../constants/theme';
import { useElementDataToSave } from './hooks/useElementDataToSave';

const MultilineTemplateField = ({ property, label }) => {
  const [nodeProperties, updateDataToSave] = useElementDataToSave();
  const propertyValue = nodeProperties[property];
  const { getAvailableProperties, loading } = useFlowPropertiesList([], 'network-only');

  const handleSave = (text) => {
    updateDataToSave({ [property]: text });
  };

  const validationMessage = useValidationMessage(property);

  const borderColor = validationMessage ? THEME.secondaryColors.invalid : '#C1C3C6';

  return (
    <Box>
      <Title>{label}</Title>

      {loading && (
        <Box borderRadius="4px" overflow="hidden" height="100px" mb="12px" width="100%">
          <Skeleton height="100px" width="100%" animation="wave" />
        </Box>
      )}

      {!loading && (
        <FormControl fullWidth error={!!validationMessage}>
          <PropertyTextEditor
            showToolbar={false}
            initialEditorText={propertyValue}
            border={`1px solid ${borderColor}`}
            handleSavePlainText={handleSave}
            properties={getAvailableProperties}
          />

          <FormHelperText>{validationMessage}</FormHelperText>
        </FormControl>
      )}
    </Box>
  );
};

MultilineTemplateField.propTypes = {
  property: string.isRequired,
  label: string.isRequired,
};

export default MultilineTemplateField;
