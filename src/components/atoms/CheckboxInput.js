import styled from 'styled-components';
import THEME from '../../constants/theme';

export const CheckboxInput = styled.input.attrs({ type: 'checkbox' })`
  flex-shrink: 0;
  position: relative;
  width: 20px;
  height: 20px;
  color: #fff;
  border: 1px solid ${THEME.greyColors.grey3};
  border-radius: 4px;
  appearance: none;
  outline: 0;
  cursor: pointer;
  background-color: #fff;
  transition: all 0.1s ease-out;
  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    content: '';
    background-image: url('/checked-box.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-color: rgba(255, 255, 255, 0);
    display: block;
    top: ${({ top }) => top || '0'};
    left: 0;
    width: 14px;
    height: 14px;
    transform: translate(0, 0.5px) scale(1.3);
    opacity: 0;
  }
  &:checked {
    background-color: #fff;
    border-color: ${THEME.primaryColors.primary};
    &::before {
      opacity: 1;
    }
  }

  &:hover {
    border-color: ${THEME.primaryColors.primary};
    box-shadow: 0 0 0 3px ${THEME.primaryColors.primaryLight};
  }
`;
