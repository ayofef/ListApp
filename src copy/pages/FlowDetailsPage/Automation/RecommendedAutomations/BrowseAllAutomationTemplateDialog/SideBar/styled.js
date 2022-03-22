import styled, { css } from 'styled-components';
import THEME from '../../../../../../constants/theme';

const StyledList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  margin-top: 34px;
`;

const ListItem = styled.li`
  &:not(:last-child) {
    margin-bottom: 2px;
  }
`;

const LINK_ACTIVE_CSS = css`
  color: ${THEME.primaryColors.primary};
  background-color: ${THEME.primaryColors.primaryLight};

  svg {
    color: ${THEME.primaryColors.primary};
    stroke: ${THEME.primaryColors.primary};
  }
`;

const StyledButton = styled.button`
  width: 240px;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding: 6px 12px;
  border-radius: 6px;
  transition: all 0.3s ease-out;
  color: ${THEME.greyColors.grey11};
  line-height: 20px;
  background: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  margin: 0 8px 0 12px;
  box-sizing: border-box;
  height: 36px;
  text-transform: ${({ capitalize }) => (capitalize ? 'capitalize' : 'none')};
  svg {
    margin-left: auto;
    color: #c1c3c6;
    font-size: 10px;
    stroke: #c1c3c6;
    stroke-width: 2px;
  }
  ${({ isActive }) => isActive && LINK_ACTIVE_CSS};

  &:hover {
    background-color: ${({ isActive }) => (isActive ? THEME.primaryColors.primaryLight : 'rgba(230, 233, 236, 0.6)')};
  }
`;

export { StyledList, ListItem, StyledButton };
