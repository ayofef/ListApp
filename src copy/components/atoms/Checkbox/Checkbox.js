import styled from 'styled-components';
import THEME from '../../../constants/theme';

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  flex-shrink: 0;
  position: relative;
  width: ${({ width }) => width || '16px'};
  height: ${({ height }) => height || '16px'};
  color: #fff;
  border: 1px solid #e6e9ec;
  border-radius: 4px;
  appearance: none;
  outline: 0;
  cursor: pointer;
  background-color: #fff;
  transition: all 0.1s ease-out;
  transform: scale(1.1);
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
    width: ${({ width }) => width || '10px'};
    height: ${({ height }) => height || '10px'};
    transform: ${({ transform }) => transform || 'translateX(-0.4px)'};
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
    box-shadow: 0 0 0 3px #f5f2ff;
  }
`;
