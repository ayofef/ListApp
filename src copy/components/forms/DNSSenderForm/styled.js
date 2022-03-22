import styled from 'styled-components';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { StyledRadio as StyledRadioBase } from '../_common/styled';

const StyledFormControlLabel = styled(FormControlLabel)`
  &.MuiFormControlLabel-root {
    align-items: flex-start;
  }
`;

const StyledRadio = styled(StyledRadioBase)`
  &.MuiRadio-root {
    margin-top: -7px;
    margin-bottom: -9px;
  }
`;

export { StyledFormControlLabel, StyledRadio };
