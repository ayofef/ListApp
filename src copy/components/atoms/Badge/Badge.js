import React from 'react';
import styled, { css } from 'styled-components';
import { arrayOf, node, oneOf, oneOfType, string } from 'prop-types';

const VARIANTS = {
  red: css`
    color: #d04c2e;
    background: rgba(240, 138, 115, 0.17);
  `,
  blue: css`
    color: #2346f2;
    background: rgba(35, 70, 242, 0.05);
  `,
  green: css`
    color: #006351;
    background: rgba(0, 99, 81, 0.11);
  `,
};

const BadgeStyled = styled.div`
  position: relative;
  border-radius: 4px;
  padding: 4px 7px;
  font-size: 12px;
  display: inline-block;
  font-weight: 500;
  line-height: 16px;
  white-space: nowrap;
  margin: ${({ margin }) => margin};
  ${({ color }) =>
    VARIANTS[color] ||
    css`
      color: #000000;
      background: #e9e9e9;
    `};
`;

const Badge = ({ children, color, className, margin }) => (
  /* TODO: investigate className */
  <BadgeStyled color={color} margin={margin} className={`${className} test`}>
    {children}
  </BadgeStyled>
);

Badge.propTypes = {
  children: oneOfType([node, arrayOf(node)]).isRequired,
  color: oneOf(Object.keys(VARIANTS)),
  margin: string,
  className: string,
};

Badge.defaultProps = {
  color: 'red',
  className: '',
  margin: '0',
};

export default Badge;
