import styled from 'styled-components';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export const StyledFormControlLabel = styled(FormControlLabel)`
  &.MuiFormControlLabel-root {
    align-items: flex-start;
    margin-right: 0 !important;
    /* margin-left: 0 !important; */

    &:first-child {
      margin-top: 6px;
    }

    &:nth-child(7),
    &:nth-child(8) {
      & > :last-child {
        margin-top: 4px;
      }
    }
  }
`;
