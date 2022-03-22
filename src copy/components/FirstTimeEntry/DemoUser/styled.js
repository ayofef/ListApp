import styled from 'styled-components';
import { ButtonRounded as ButtonRoundedBase } from '../../atoms';
import THEME from '../../../constants/theme';

const ButtonRounded = styled(ButtonRoundedBase)`
  &.MuiButton-root {
    height: initial;

    &.MuiButton-containedPrimary {
      color: #3023c8;
      background-color: #fff;

      &:hover {
        background-color: #e6e6e6;
      }
    }
  }
`;

const PopupContainer = styled.div`
  position: fixed;
  left: 72px;
  bottom: ${({ isOpen }) => (isOpen ? '16px' : '0')};
  background-color: ${THEME.primaryColors.purpleMain};
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  border-bottom-left-radius: ${({ isOpen }) => (isOpen ? '24px' : '0')};
  border-bottom-right-radius: ${({ isOpen }) => (isOpen ? '24px' : '0')};
  z-index: 1202;
  max-width: 256px;
  box-shadow: 0 10px 23px rgba(39, 26, 93, 0.25);
  transition: 0.05s linear;
  width: 256px;

  &:hover {
    cursor: pointer;
  }
`;

const ChevronWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
  width: 100%;
  height: 36px;
  padding-bottom: 4px;

  svg {
    transform: ${({ isOpen }) => (isOpen ? '' : 'rotate(180deg)')};
  }
`;

export { ButtonRounded, PopupContainer, ChevronWrapper };
