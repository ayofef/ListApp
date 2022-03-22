import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';

export const StyledFormControl = styled(FormControl)`
  &.MuiFormControl-root {
    padding: 9px;
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
