import styled from 'styled-components';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {
  StyledDialogActions as StyledDialogActionsBase,
  StyledDialog as StyledDialogBase,
} from '../../../components/Dialog/styled';

export const StyledFormControlLabel = styled(FormControlLabel)`
  &.MuiFormControlLabel-root {
    align-items: flex-start;
  }
`;

export const StyledDialogActions = styled(StyledDialogActionsBase)`
  &.MuiDialogActions-root {
    position: relative;
  }
`;

export const StyledDialog = styled(StyledDialogBase)`
  &.MuiDialog-root {
    & .MuiDialog-paperWidthSm {
      max-width: 460px;
    }

    & .MuiDialog-paperWidthMd {
      max-width: 720px;
    }
  }
`;
