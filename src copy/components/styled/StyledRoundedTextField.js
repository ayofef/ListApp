import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

const StyledRoundedTextField = styled(TextField)`
  & .MuiOutlinedInput-notchedOutline {
    border-radius: 8px !important;
    border-width: 1px !important;
    border-color: #9ca0ff !important;
  }
  & .MuiInputBase-input {
    padding: 11.5px 45px 11.5px 14px !important;
  }
`;

StyledRoundedTextField.defaultProps = {
  variant: 'outlined',
  size: 'small',
};

export { StyledRoundedTextField };
