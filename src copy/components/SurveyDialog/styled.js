import styled, { css, keyframes } from 'styled-components';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';

const StyledFormControlLabel = styled(FormControlLabel)`
  &.MuiFormControlLabel-root {
    margin: 0;
    padding: 5px 16px 5px 5px;
    background-color: #f5f6f7;
    border-radius: 6px;
    min-height: 50px;

    & + & {
      margin-top: 8px;
    }

    .MuiFormControlLabel-label {
      margin-left: 7px;
      font-size: 12px;
      font-weight: 600;
    }
    & input[type='checkbox'] {
      margin: 12px 16px;
    }
  }
`;

const StyledDialog = styled(Dialog)`
  & .MuiBackdrop-root {
    display: none;
    visibility: hidden;
    opacity: 0 !important;
  }
  & .MuiDialog-container {
    transition: none !important;
    z-index: 1500;
  }
  & .MuiDialog-paper {
    overflow: hidden;
  }
`;

const StyledDialogTitle = styled(DialogTitle)`
  &.MuiDialogTitle-root {
    padding: 0;
  }
`;

const StyledDialogActions = styled(DialogActions)`
  &.MuiDialogActions-root {
    padding: 0;
  }
`;

const check = keyframes`
  from {
    stroke-dashoffset: 37.87860107421875px;
  }to {
    stroke-dashoffset: 0;
  }
`;
const bubble = keyframes`
  from {
    transform: scale(1);
    opacity: 1;
  }to {
    transform: scale(1.5);
    opacity: 0;
  }
`;
const checkAnimation = css`
  animation: ${check} 0.3s ease;
  animation-delay: 0.21s;
  animation-fill-mode: backwards;
`;
const bubbleAnimation = css`
  animation: ${bubble} 2s ease;
  animation-iteration-count: infinite;
  animation-fill-mode: backwards;
`;

const StyledCheck = styled.div`
  margin-bottom: 56px;
  position: relative;

  svg {
    position: relative;
    z-index: 600;
    .check-path {
      stroke-dasharray: 37.87860107421875px;
      ${checkAnimation};
    }
  }

  &::before,
  &::after {
    content: '';
    display: block;
    position: absolute;
    width: 160px;
    height: 160px;
    background-color: #f5f2ff;
    top: -70px;
    left: -70px;
    border-radius: 50%;
  }

  &::after {
    ${bubbleAnimation};
  }
`;

export { StyledFormControlLabel, StyledDialogTitle, StyledDialogActions, StyledDialog, StyledCheck, bubbleAnimation };
