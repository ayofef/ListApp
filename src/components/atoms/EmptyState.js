import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import EmptyStateIcon from '../../assets/img/empty-state.svg';

const StyledEmptyStateWrapper = styled.div`
  width: 100%;
  margin: ${({ $margin }) => $margin};

  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin-top: 16px;
    text-align: center;
    font-size: 16px;
  }
`;

const StyledEmptyStateIconWrapper = styled.div`
  width: ${({ $imageWidth }) => $imageWidth};
  margin: 0 auto;

  img {
    width: 100%;
  }
`;

function EmptyState({ message, margin, imageWidth }) {
  return (
    <StyledEmptyStateWrapper $margin={margin}>
      <StyledEmptyStateIconWrapper $imageWidth={imageWidth}>
        <img src={EmptyStateIcon} alt="empty list" />
      </StyledEmptyStateIconWrapper>
      <p>{message}</p>
    </StyledEmptyStateWrapper>
  );
}

EmptyState.propTypes = {
  margin: PropTypes.string,
  message: PropTypes.string.isRequired,
  imageWidth: PropTypes.string,
};

EmptyState.defaultProps = {
  margin: undefined,
  imageWidth: '160px',
};

export default EmptyState;
