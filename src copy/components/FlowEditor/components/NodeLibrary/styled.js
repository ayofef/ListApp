import styled, { css } from 'styled-components';
import THEME from '../../../../constants/theme';
import ErrorCrossIcon from '../../../../assets/icons/FlowMonitor/ErrorCrossIcon';

export const DRAWER_WIDTH = 336;

export const ItemContainer = styled.div`
  background: #ffffff;
  transition: all 0.1s ease-out;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: ${({ $padding }) => $padding || '8px'};
  box-sizing: border-box;
  margin: 0 16px;
  align-items: center;
  cursor: pointer;
  border-radius: 8px;
  user-select: none;
  span {
    div {
      max-width: 200px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  * {
    user-select: none;
  }
  &:hover,
  &:active {
    background: ${THEME.secondaryColors.inputBg};
  }
  &:active {
    cursor: grabbing;
  }
`;

export const StyledDrawerPaper = styled.div`
  background: ${THEME.primaryColors.white};
  position: absolute;
  width: ${DRAWER_WIDTH}px;
  height: ${({ open }) => (open ? 'calc(100vh - 128px)' : '60px')};
  transition: all 0.3s ease-out;
  z-index: 50;
  bottom: 24px;
  left: 24px;
  display: block;
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  * {
    opacity: ${({ open }) => (open ? '1' : '0')};
  }
`;

export const DrawerSearchContainer = styled.div`
  margin: 8px 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  opacity: 1;
  display: ${({ open }) => (open ? 'block' : 'none')};
`;

export const NodeLibraryContainer = styled.div`
  display: ${({ open }) => (open ? 'flex' : 'none')};
  flex-direction: column;
  align-content: flex-start;
  overflow-y: scroll;
  height: ${({ isModal }) => (isModal ? '100%' : 'calc(100% - 140px)')};
  box-sizing: border-box;
  overflow-x: hidden;
  border-top: ${({ isModal }) => (isModal ? 'none' : `1px solid ${THEME.greyColors.grey5}`)};
  padding: ${({ $searchActive }) => ($searchActive ? '18px 0' : ' 4px 0 16px 0')};

  & > :not(:last-child) {
    margin-bottom: 24px;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
  }
`;

export const StyledButton = styled.div`
  cursor: pointer;
  opacity: 1;
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s ease-out;
  backface-visibility: hidden;
  background-color: #fff;
  border-radius: 8px;
  margin-right: 8px;
  & svg {
    transform: translateX(1px);
  }
  &:hover {
    background-color: ${THEME.greyColors.grey12};
  }
`;

export const IconWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ $color }) =>
    $color &&
    css`
      & svg {
        color: ${$color};
      }
    `};
`;

export const HeaderWrapper = styled.div`
  display: flex;
  margin: 0 24px;
  justify-content: space-between;
  p {
    text-transform: capitalize;
  }
`;

export const NodeIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => (size ? `${size}px` : '32px')};
  height: ${({ size }) => (size ? `${size}px` : '32px')};
  border-radius: 50%;
  margin-right: ${({ mr }) => mr};
  background: ${({ background }) => background};
  position: relative;
`;

export const TemplatesList = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  overflow: scroll;
  padding-bottom: 24px;
`;

export const TemplateWrapper = styled.div`
  cursor: pointer;
  width: 208px;
  box-sizing: border-box;
  padding: 16px;
  border: 1px solid ${THEME.greyColors.grey5};
  border-radius: 6px;
  margin-left: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  &:first-child {
    margin-left: 24px;
  }
  &:last-child {
    margin-right: 24px;
  }
  p {
    white-space: nowrap;
    width: 176px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const TemplateNodes = styled.div`
  margin-bottom: 16px;
`;

export const ShowAll = styled.div`
  cursor: pointer;
  p {
    color: ${THEME.primaryColors.blue};
  }
`;
export const StyledErrorIcon = styled(ErrorCrossIcon)`
  position: absolute;
  bottom: -7px;
  right: -7px;
  border: 2px solid ${THEME.primaryColors.white};
  border-radius: 100%;
`;

export const StyledTabHeaderWrapper = styled.div`
  opacity: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 16px;
  height: 56px;
  border-bottom: ${({ $open }) => ($open ? `1px solid ${THEME.greyColors.grey5}` : 'none')};
  transform: ${({ $open }) => ($open ? 'translateY(0)' : 'translateY(2px)')};
  * {
    opacity: 1;
  }
  ${({ $open, $isInstructAutomation }) =>
    (!$open || $isInstructAutomation) &&
    css`
      cursor: pointer;
    `};
`;
