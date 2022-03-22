import styled from 'styled-components';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';

const StyledInputLabel = styled(InputLabel)`
  &.MuiFormLabel-root {
    color: initial;
    line-height: 20px;
    font-weight: 600;
  }

  &.Mui-focused {
    color: #3f51b5;
  }

  &.MuiInputLabel-shrink {
    transform: translate(0, 1.5px);
  }
`;

const StyledInput = styled(InputBase)`
  &.MuiInputBase-root {
    label + & {
      margin-top: 30px;
    }
  }

  .MuiInputBase-input {
    position: relative;
    height: 18px;
    padding: 10px 16px;
    border: 1px solid transparent;
    border-radius: 6px;
    background-color: #f5f6f7;
    line-height: 18px;
    transition-property: border-color, box-shadow;
    transition-duration: 0.3s;

    &:focus {
      border-color: #3023c8;
    }
  }
`;
export { StyledInput, StyledInputLabel };
