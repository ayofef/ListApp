import styled from 'styled-components';
import { Checkbox } from '../../../../atoms';
import THEME from '../../../../../constants/theme';

const StyledWrapper = styled.div`
  margin-bottom: 12px;
  position: relative;
  width: 100%;
  &::before {
    content: '';
    display: block;
    position: absolute;
    top: -4px;
    left: -10px;
    width: calc(100% + 20px);
    height: calc(100% + 8px);
    background-color: #f5f2ff;
    border-radius: 8px;
    opacity: 0;
    transition: all 0.3s ease-out;
  }
  :hover {
    &::before {
      ${({ isInvited }) => !isInvited && 'opacity: 1'};
    }
  }

  & .MuiFormControlLabel-root {
    margin-right: 0 !important;
  }
`;

const StyledCheckbox = styled(Checkbox)`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background-color: #f5f6f7;

  &::before {
    content: '';
    position: absolute;
    display: block;
    top: 6px;
    left: 12px;
    width: 8px;
    height: 15px;
    border-color: ${THEME.primaryColors.primary};
    transform: rotate(45deg);
    opacity: 0;
    background-image: none;
    border-style: solid;
    border-color: ${THEME.primaryColors.primary};
    border-width: 0 2px 2px 0;
  }
  &::after {
    content: '+';
    position: absolute;
    display: block;
    top: -2px;
    left: 6px;
    width: 100%;
    height: 100%;
    opacity: 1;
    color: #787f88;
    font-size: 30px;
    line-height: 1;
  }
  &:checked {
    background-color: ${({ isInvited }) => (isInvited ? '#F5F6F7' : THEME.primaryColors.primary)};
    &::before {
      opacity: 1;
      border-color: ${({ isInvited }) => (isInvited ? '#787f88' : '#fff')};
    }
    &::after {
      opacity: 0;
      visibility: hidden;
    }
  }

  &:hover {
    box-shadow: none;
  }
`;

export { StyledWrapper, StyledCheckbox };
