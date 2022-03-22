import React from 'react';
import { components } from 'react-select';
import PropTypes from 'prop-types';
import { StyledMultiValue, StyledValueType } from './styled';

const ReactSelectMultiValue = ({ data, ...props }) => {
  return (
    <StyledMultiValue>
      <StyledValueType>{data?.type}</StyledValueType>
      <components.MultiValue {...props} />
    </StyledMultiValue>
  );
};

ReactSelectMultiValue.propTypes = {
  data: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
  }),
};

ReactSelectMultiValue.defaultProps = {
  data: null,
};

export default ReactSelectMultiValue;
