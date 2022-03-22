import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import Skeleton from '@material-ui/lab/Skeleton';
import PropertyTextEditor from '../../../../../../PropertyTextEditor';
import { useFlowPropertiesList } from '../hooks';

const TextEditorInput = ({ name, value, onChange }) => {
  const { loading, getAvailableProperties } = useFlowPropertiesList();
  const handleSavePlainText = useCallback((inputValue) => onChange({ target: { name, value: inputValue } }), [
    onChange,
    name,
  ]);

  return (
    <FormControl fullWidth>
      {loading ? (
        <Skeleton />
      ) : (
        <PropertyTextEditor
          initialEditorText={value}
          handleSavePlainText={handleSavePlainText}
          properties={getAvailableProperties}
          border="1px solid #C1C3C6"
          minHeight="none"
          showToolbar={false}
          singleProperty
        />
      )}
    </FormControl>
  );
};

TextEditorInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextEditorInput;
