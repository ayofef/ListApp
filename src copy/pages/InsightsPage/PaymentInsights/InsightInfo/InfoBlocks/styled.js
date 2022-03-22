import { Grid } from '@material-ui/core';
import { bool, string } from 'prop-types';

import styled, { css } from 'styled-components';
import THEME from '../../../../../constants/theme';

const StyledGrid = styled(Grid)`
  &:first-child {
    ul {
      padding-left: 0;
    }
  }
  &:last-child:not(:first-child) {
    ul {
      ${({ $central }) => !$central && 'padding-right: 0;'};
    }
  }
`;

StyledGrid.propTypes = {
  $central: bool,
};

StyledGrid.defaultProps = {
  $central: false,
};

const Ul = styled.ul`
  list-style: none;
  padding: 30px 30px 28px 30px;
  margin: 0;
  border: 1px solid #e6e9ec;
  border-left-color: transparent;
  border-right-color: ${({ $borderRightColor }) => $borderRightColor || 'transparent'};
  border-top-color: ${({ $borderTopColor }) => $borderTopColor || `${THEME.greyColors.grey5}`};

  height: 100%;
  min-height: 300px;
  ${({ central }) =>
    central &&
    css`
      border-left-color: #e6e9ec;
      border-right-color: #e6e9ec;
    `}
  ${({ noBottomBorder }) =>
    noBottomBorder &&
    css`
      border-bottom: none;
    `}
  p {
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
    color: #787f88;
  }
`;

Ul.propTypes = {
  $borderRightColor: string,
  $borderTopColor: string,
};

Ul.defaultProps = {
  $borderRightColor: undefined,
  $borderTopColor: undefined,
};

const Li = styled.li`
  display: flex;
  justify-content: space-between;
  padding: ${({ showMoreButton }) => (showMoreButton ? '0' : '10px 0')};
  border-bottom: 1px solid #e6e9ec;
  align-items: center;
  height: 52px;

  & .MuiButton-root {
    letter-spacing: 0;
  }

  &:last-child {
    border-bottom: none;
  }
  .name-icon {
    display: flex;
    align-items: center;

    & > :not(:last-child) {
      margin-right: 12px;
    }
  }
  span {
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 12px;
    text-align: left;
  }
`;

export { StyledGrid, Ul, Li };
