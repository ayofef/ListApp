import React from 'react';
import styled from 'styled-components';
import { arrayOf, func, node, oneOfType } from 'prop-types';
import THEME from '../../../constants/theme';
import { onFileSelect, FILE_TYPE, ACCEPTED_IMAGE_FILE_TYPES } from '../../../utils/fileSelectReader';

const LabelWrapper = styled.label`
  padding: 0;
  cursor: pointer;
  color: ${({ color }) => color || THEME.primaryColors.main};
  font-size: ${({ fontSize }) => fontSize || 12}px;
  margin: ${({ margin }) => margin || '0px'};

  &:hover {
    color: ${THEME.secondaryColors.blue};
  }
  .MuiCircularProgress-circle {
    margin-left: 10px;
  }
`;

const InputWrapper = styled.input`
  display: none;
`;

//TODO: rework component to use "react-dropzone"

const ImageFileInput = ({ fileSelected, children, ...props }) => {
  return (
    <LabelWrapper {...props}>
      {children}
      <InputWrapper
        type="file"
        accept={ACCEPTED_IMAGE_FILE_TYPES.join(',')}
        onChange={(e) => onFileSelect(e, fileSelected, FILE_TYPE.image)}
      />
    </LabelWrapper>
  );
};

ImageFileInput.propTypes = {
  children: oneOfType([node, arrayOf(node)]).isRequired,
  fileSelected: func.isRequired,
};

export default ImageFileInput;
