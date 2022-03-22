import styled, { css } from 'styled-components';
import THEME from '../../../../../constants/theme';
import { SIDEBAR_WIDTH, SIDEBAR_WIDTH_IN_MODAL } from '../constant';

const StyledAside = styled.aside`
  width: ${({ $inModal }) => ($inModal ? SIDEBAR_WIDTH_IN_MODAL : SIDEBAR_WIDTH)};
  height: min-content;
  display: block;
  box-sizing: border-box;

  background-color: ${({ $inModal }) => ($inModal ? THEME.primaryColors.white : THEME.greyColors.grey21)};
  border-radius: 8px;
  margin-right: 16px;
  padding: 14px 24px;
  margin-top: 24px;
  ${({ $inModal }) =>
    $inModal &&
    css`
      position: sticky;
      left: 0;
      top: 0;
      bottom: 0;
      height: 100%;
      padding-left: 0;
      padding-top: 52px;
      border-radius: 0;
      max-width: 231px;
      width: 100%;
      margin: 0;
    `}
`;

const StyledList = styled.ul`
  margin: 0;
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  &:not(:last-child) {
    margin-bottom: 2px;
  }
`;

const LINK_ACTIVE_CSS = css`
  color: ${THEME.primaryColors.primary};

  svg {
    color: ${THEME.primaryColors.primary};
  }
  & svg:last-child {
    visibility: visible;
  }
`;

const StyledButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding: 6px 0;
  border-radius: 6px;
  transition: all 0.3s ease-out;
  line-height: 20px;
  background: rgba(255, 255, 255, 0);
  outline: none;
  border: none;
  cursor: pointer;
  box-sizing: border-box;
  text-transform: capitalize;

  svg:first-child {
    margin-right: 8px;
    font-size: inherit;
  }

  svg:last-child {
    visibility: hidden;
    margin-left: auto;
    color: ${THEME.primaryColors.primary};
    font-size: 10px;
    stroke: ${THEME.primaryColors.primary};
    stroke-width: 2px;
  }
  ${({ isActive }) => isActive && LINK_ACTIVE_CSS};

  &:hover {
    ${LINK_ACTIVE_CSS};
    stroke: ${THEME.primaryColors.primary};
    & svg:last-child {
      visibility: visible;
    }
  }
`;

export { StyledList, ListItem, StyledButton, StyledAside };
