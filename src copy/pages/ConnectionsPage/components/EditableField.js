import React, { useState, useCallback, useEffect } from 'react';
import { func, string, bool } from 'prop-types';
import { Box } from '@material-ui/core';
import noop from 'lodash/noop';
import { InputField } from '../../../components/atoms';

import { InputCover } from '../styled';

const EditableField = ({
  value,
  updateValue,
  submit,
  reset,
  fontSize,
  defaultTransform,
  editingTransform,
  margin,
  height,
  width,
  lineHeight,
  fontWeight,
  multiline,
  padding,
  ...rest
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditingState = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditing(true);
  };

  const escFunction = useCallback(
    (event) => {
      if (event.keyCode === 27) {
        setIsEditing(false);
        reset();
      }
    },
    [reset]
  );

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      submit();
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    submit();
    setIsEditing(false);
  };

  return (
    <InputCover
      onClick={handleEditingState}
      isEditing={isEditing}
      transform={isEditing ? editingTransform : defaultTransform}
      margin={margin}
      {...rest}
    >
      {isEditing ? (
        <InputField
          autoFocus
          size="smaller"
          variant="outlined"
          type="text"
          value={value}
          innerPaddingLeft="6px"
          noBorder
          onBlur={handleBlur}
          margin="none"
          fontSize={fontSize}
          height={height}
          onChange={(event) => updateValue(event.target.value)}
          onKeyPress={(event) => handleKeyDown(event)}
          padding={padding}
          width={width}
          lineHeight={lineHeight}
          fontWeight={fontWeight}
          multiline={multiline}
        />
      ) : (
        <Box
          fontWeight={fontWeight}
          fontSize={fontSize}
          lineHeight={lineHeight}
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          title={value}
        >
          {value}
        </Box>
      )}
    </InputCover>
  );
};

EditableField.propTypes = {
  value: string.isRequired,
  updateValue: func,
  submit: func.isRequired,
  reset: func.isRequired,
  margin: string,
  fontSize: string,
  defaultTransform: string,
  editingTransform: string,
  height: string,
  width: string,
  lineHeight: string,
  fontWeight: string,
  multiline: bool,
  padding: string,
};

EditableField.defaultProps = {
  margin: '0 0 9px 0',
  updateValue: noop,
  fontSize: '16px !important',
  defaultTransform: undefined,
  editingTransform: undefined,
  height: '',
  width: undefined,
  lineHeight: undefined,
  fontWeight: undefined,
  multiline: false,
  padding: undefined,
};

export default EditableField;
