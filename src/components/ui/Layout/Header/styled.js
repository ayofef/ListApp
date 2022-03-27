import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import THEME from '../../../../constants/theme';

const StyledHeader = styled.header`
  width: 100%;
  background-color: ${THEME.primaryColors.primaryLight};
`;

const StyledHeaderContent = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 16px 14px;
`;

const StyledHeaderContentRight = styled(Link)`
  display: flex;
  align-items: center;
`;

const StyledHeaderContentLeft = styled.div`
  display: flex;
  align-items: center;

  & > :not(:last-child) {
    margin-right: 16px;
  }
`;

const StyledHamburgerButton = styled.button`
  position: relative;
  padding: 22px 12px;
  margin: 0;
  border: none;
  outline: none;
  background-color: #fff;
  cursor: pointer;
  display: none;
  transition: all 0.3s ease-out;
  z-index: 99999;
  border-radius: 8px;

  & span,
  & span::before,
  & span::after {
    width: 28px;
    height: 1.6px;
    background-color: ${THEME.primaryColors.primary};
    display: block;
    z-index: 99999;
  }

  span {
    position: relative;

    &::before,
    &::after {
      content: '';
      position: absolute;
      left: 0;
      transition: all 0.2s;
    }

    &::before {
      top: -10px;
    }
    &::after {
      top: 10px;
    }
  }

  @media screen and (max-width: 700px) {
    display: block;
  }

  ${({ $menuIsOpen }) =>
    $menuIsOpen &&
    css`
      background-color: ${THEME.primaryColors.primaryLight};
      & span {
        background-color: rgba(0, 0, 0, 0);

        &::before {
          top: 0;
          transform: rotate(135deg);
        }
        &::after {
          top: 0;
          transform: rotate(-135deg);
        }
      }
    `};
`;

export { StyledHeader, StyledHeaderContent, StyledHeaderContentRight, StyledHeaderContentLeft, StyledHamburgerButton };
