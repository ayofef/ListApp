import React from 'react';
import styled, { css } from 'styled-components';
import Box from '@material-ui/core/Box';

const VARIANTS = {
  fulfilled: 'fulfilled',
  pending: 'pending',
};

const VARIANT_CSS = {
  [VARIANTS.fulfilled]: css`
    color: #06aa4e;
    background-color: rgba(28, 206, 106, 0.1);
  `,
  [VARIANTS.pending]: css`
    color: #777138;
    background-color: #f5eeae;
  `,
};

const StyledText = styled(Box)`
  font-size: 12px;
  white-space: nowrap;
  user-select: none;
`;

StyledText.defaultProps = {
  component: 'span',
  color: '#232629',
};

const StyledBadge = styled(({ variant, ...props }) => <StyledText {...props} />)`
  ${({ variant }) => VARIANT_CSS[variant]}
`;

StyledBadge.variants = VARIANTS;

StyledBadge.defaultProps = {
  component: 'span',
  p: '4px 8px',
  borderRadius: '6px',
  variant: 'pending',
};

export { StyledText, StyledBadge };
