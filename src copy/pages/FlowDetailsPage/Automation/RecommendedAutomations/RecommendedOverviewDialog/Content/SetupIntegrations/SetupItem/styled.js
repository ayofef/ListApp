import styled from 'styled-components';
import THEME from '../../../../../../../../constants/theme';

export const StyledSetupItem = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${THEME.greyColors.grey5};
  height: ${({ $height }) => $height};
  overflow: hidden;
  transition: height 0.3s ease-out;
  padding: 0 16px;
  &:hover {
    cursor: pointer;
  }
  &:last-child {
    border-bottom: none;
  }
  svg {
    transition: all 0.2s ease-out;
    transform: ${({ $isOpen }) => ($isOpen ? 'rotate(0deg) translate(0,4px)' : 'rotate(-180deg) translate(0,-4px)')};
  }
`;
