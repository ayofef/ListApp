import styled from 'styled-components';
import { ReactMultiEmail } from 'react-multi-email';

import FormControl from '@material-ui/core/FormControl';
import { ButtonRounded as ButtonRoundedBase } from '../../atoms/Buttons/ButtonRounded';

const ButtonRounded = styled(ButtonRoundedBase)`
  &.MuiButton-root {
    &.MuiButton-containedSecondary {
      color: #fff;
      background-color: #787f88;

      &:hover {
        background-color: #3c3f44;
      }
    }
  }
`;

const StyledFormControl = styled(FormControl)`
  &.MuiFormControl-root {
    padding: 18px;
    background-color: #f5f6f7;
    box-sizing: border-box;
    border-radius: 6px;

    & .MuiInputBase-root {
      &:before,
      &:after {
        display: none;
      }
    }
  }
`;

const StyledReactMultiEmail = styled(ReactMultiEmail)`
  display: flex;
  flex: 1 1 auto;
  flex-wrap: wrap;
  margin: -4px;

  & > input {
    margin: 4px;
    min-height: 36px;
    border: none;
    outline: none;
    background: transparent;
  }
`;

export { ButtonRounded, StyledReactMultiEmail, StyledFormControl };
