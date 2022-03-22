import React from 'react';
import PropTypes from 'prop-types';
import { CloseIcon } from '../../assets/icons';
import { StyledButton } from './styled';

const CloseButton = ({ onClick, iconColor, ...rest }) => {
  return (
    <StyledButton onClick={onClick} {...rest}>
      <CloseIcon stroke={iconColor} height="32px" width="32px" />
    </StyledButton>
  );
};

CloseButton.propTypes = {
  iconColor: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

CloseButton.defaultProps = {
  iconColor: '#787F88',
};

export default CloseButton;
