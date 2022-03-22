import React from 'react';
import { arrayOf, node, oneOfType, string } from 'prop-types';
import styled from 'styled-components';

import THEME from '../../../constants/theme';

const ButtonWrapper = styled.button`
  outline: none;
  padding: 0;
  background-color: transparent;
  cursor: pointer;
  border: none;
  color: ${({ color }) => color || THEME.primaryColors.main};
  font-size: ${({ fontSize }) => fontSize};
  margin: ${({ margin }) => margin};
  &:hover {
    color: ${THEME.secondaryColors.blue};
  }
`;

const ButtonLink = ({ children, ...props }) => <ButtonWrapper {...props}>{children}</ButtonWrapper>;

ButtonLink.propTypes = {
  children: oneOfType([node, arrayOf(node)]).isRequired,
  color: string,
  margin: string,
  fontSize: string,
};

ButtonLink.defaultProps = {
  color: undefined,
  margin: '0px',
  fontSize: '12px',
};

export default ButtonLink;
