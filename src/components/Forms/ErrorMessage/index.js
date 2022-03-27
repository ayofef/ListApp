import PropTypes from 'prop-types';
import React from 'react';
import { StyledErrorMessage } from './styled';

function ErrorMessage({ message, margin }) {
  return <StyledErrorMessage $margin={margin}>{message}</StyledErrorMessage>;
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  margin: PropTypes.string,
};

ErrorMessage.defaultProps = {
  margin: undefined,
};

export default ErrorMessage;
