import React, { useCallback } from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Close from '@material-ui/icons/Close';
import { useFlatFlowProperties } from '../useFlatFlowProperties';
import { useValidationMessage } from '../hooks';
import PropertyTextEditor from '../../../../../../PropertyTextEditor';
import THEME from '../../../../../../../constants/theme';
import { useElementDataToSave } from '../hooks/useElementDataToSave';
import ListLoadingState from '../ListLoadingState';

const SearchTermsField = ({ index }) => {
  const { loading, getAvailableProperties } = useFlatFlowProperties();

  const [{ searchTerms }, updateDataToSave] = useElementDataToSave();

  const setInputField = useCallback(
    (value) => {
      const newSearchTerms = [...(searchTerms ?? [])];
      newSearchTerms[index] = value;
      updateDataToSave({ searchTerms: newSearchTerms });
    },
    [searchTerms, updateDataToSave, index]
  );

  const onClose = useCallback(() => {
    const newSearchTerms = [...(searchTerms ?? [])];
    newSearchTerms.splice(index, 1);

    updateDataToSave({ searchTerms: newSearchTerms });
  }, [searchTerms, updateDataToSave, index]);

  const searchTerm = searchTerms[index];

  const validationMessage = useValidationMessage('searchTerms');

  const borderColor = validationMessage ? THEME.secondaryColors.invalid : 'rgba(255,255,255,0)';

  return (
    <Box display="flex" mb="6px">
      <Box position="relative" flexGrow={1}>
        <FormControl fullWidth error={!!validationMessage}>
          {loading && <ListLoadingState />}
          {!loading && (
            <PropertyTextEditor
              showToolbar={false}
              initialEditorText={searchTerm}
              border={`1px solid ${borderColor}`}
              handleSavePlainText={setInputField}
              properties={getAvailableProperties}
              minHeight="0"
              maxHeight="48px"
              padding="12px 16px !important"
              singleProperty
              propertyButtonYaxis="6px"
            />
          )}
          <FormHelperText>{validationMessage}</FormHelperText>
        </FormControl>
      </Box>
      <Box ml={2} alignItems="center" display="flex">
        <Box height="24px">
          <IconButton size="small" onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

SearchTermsField.propTypes = {
  index: PropTypes.number.isRequired,
};

export default SearchTermsField;
