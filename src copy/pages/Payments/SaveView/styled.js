import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

import defaultFont from '../../../components/atoms/defaultFont';

const StyledTextField = styled(TextField)`
  &.MuiFormControl-root {
    display: flex;

    & .MuiFormHelperText-contained {
      margin-left: 0;
    }
  }

  & .MuiInputBase-root {
    & .MuiInputBase-input {
      padding: 11px 15px;
      ${defaultFont};
      font-size: 14px;
      line-height: 20px;
    }

    &:hover {
      & .MuiOutlinedInput-notchedOutline {
        border-color: #3023c8;
      }
    }
  }
  & .Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #3023c8 !important;
    border-width: 1px;
    outline: none !important;
    box-shadow: 0 0 2px 2px rgba(151, 127, 255, 0.23) !important;
  }
`;

export { StyledTextField };
