import React from 'react';
import PropTypes from 'prop-types';
import ChevronLeft from '../../assets/icons/Elements/ChevronLeft';
import { StyledGoBackButton } from './styled';

const GoBackButton = ({ onClick, ...rest }) => {
  return (
    <StyledGoBackButton onClick={onClick} {...rest}>
      <ChevronLeft stroke="#787F88" />
    </StyledGoBackButton>
  );
};

GoBackButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default GoBackButton;
