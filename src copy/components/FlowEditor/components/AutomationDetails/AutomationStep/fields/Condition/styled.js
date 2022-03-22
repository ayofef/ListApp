import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import { StyledFormControl as StyledFormControlBase } from '../styled';
import THEME from '../../../../../../../constants/theme';

const WrapperBox = styled(Box)`
  position: relative;
  margin-top: 20px;
  margin-bottom: ${({ $inputType }) => ($inputType ? '20px' : '35px')};
  & .MuiButtonBase-root {
    visibility: hidden;
  }
  &:hover {
    & .MuiButtonBase-root {
      visibility: visible;
    }
  }
`;

const ConditionBox = styled(Box)`
  position: relative;
  border: 1px solid #e6e9ec;
  padding: 30px 30px 40px 30px;
  border-radius: 8px;
  border-bottom-left-radius: ${({ $inputType }) => ($inputType ? '0' : '8px')};
  border-bottom-right-radius: ${({ $inputType }) => ($inputType ? '0' : '8px')};
`;

const InputBox = styled(ConditionBox)`
  padding: 40px 30px 30px 30px;
  border-top: 0;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`;

const StyledFormControl = styled(StyledFormControlBase)`
  &.MuiFormControl-root {
    padding: 5px 16px;
  }
`;

const StyledOperatorControl = styled(StyledFormControlBase)`
  &.MuiFormControl-root {
    position: absolute;
    bottom: -15px;
    left: 50%;
    z-index: 3;
    transform: translateX(-50%);
    background-color: #fff;
    border: 1px solid #e6e9ec;
    border-radius: 40px;
    padding: 0 0 0 16px;
    & .MuiInputBase-root {
      margin: 0;
      color: ${THEME.primaryColors.blue};
      & .MuiSelect-root {
        &.MuiSelect-select {
          &.MuiSelect-select {
            padding-right: 32px;
          }
        }
      }
    }
  }
  & .MuiSelect-icon {
    color: currentColor;
    right: 5px;
  }
`;

const StyledBox = styled(Box)`
  position: absolute;
  color: #fff;
  top: -10px;
  right: -10px;
  & .MuiButtonBase-root {
    width: 24px;
    height: 24px;
    background-color: rgba(183, 66, 66, 1);
    cursor: pointer;
    &:hover {
      background-color: rgba(183, 66, 66, 0.8);
    }
  }
  & .MuiSvgIcon-root {
    font-size: 16px;
  }
`;

export { WrapperBox, ConditionBox, StyledFormControl, StyledOperatorControl, InputBox, StyledBox };
