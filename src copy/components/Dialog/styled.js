import styled, { css } from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import DialogContentText from '@material-ui/core/DialogContentText';
import defaultFont from '../atoms/defaultFont';
import THEME from '../../constants/theme';

const paddingX = '24px';
const paddingY = '32px';

const StyledPaper = styled(Paper)`
  &.MuiPaper-root {
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.04), 0 0 14px rgba(0, 0, 0, 0.04);
    overflow-y: ${({ $overflowY }) => $overflowY || 'auto'};
    &.MuiPaper-rounded {
      //TODO: migrate all borderRadius to transient props
      border-radius: ${({ borderRadius, $borderRadius }) => borderRadius || $borderRadius || '12px'};
    }
  }
`;

const StyledDialog = styled(Dialog)`
  &.MuiDialog-root {
    & .MuiBackdrop-root {
      background-color: rgba(193, 195, 198, 0.4) !important;
    }
    & .MuiDialog-paper {
      height: ${({ $height }) => $height || 'auto'};
      width: ${({ $customWidth }) => $customWidth || '100%'};
    }
    & .MuiDialog-paperWidthXs {
      max-width: ${({ width }) => width || '389px'};
    }
    & .MuiDialog-paperWidthLg {
      max-width: 750px;
    }
    & .MuiDialog-paperWidthXl {
      max-width: 1104px;
      flex: 1;
    }
    & .MuiDialog-paper {
      height: ${({ $height }) => $height};
    }
  }
`;

const StyledDialogActions = styled(DialogActions)`
  &.MuiDialogActions-root {
    padding: ${({ px, py }) => `${py ?? paddingX} ${px ?? paddingY}`};
    justify-content: ${({ $justifyContent }) => $justifyContent || 'flex-start'};
    ${({ $fixed }) =>
      $fixed &&
      css`
        position: sticky;
        bottom: 0;
        background: ${THEME.primaryColors.white};
        width: 100%;
      `}

    ${({ $borderTop }) =>
      $borderTop &&
      css`
        border-top: 1px solid rgba(193, 195, 198, 0.2);
      `};

    &.MuiDialogActions-spacing {
      & > :not(:first-child) {
        margin-left: ${({ $buttonMargin }) => $buttonMargin || '8px'};
      }
    }
  }
`;

const StyledDialogContent = styled(DialogContent)`
  &.MuiDialogContent-root {
    padding: 0 ${({ px }) => px ?? paddingY};
    ${({ $overflowX }) => $overflowX && `overflow-x: ${$overflowX}`};
  }
`;
const StyledDialogContentText = styled(DialogContentText)`
  &.MuiDialogContentText-root {
    padding: 0 ${paddingY};
    font-size: 14px;
    line-height: 20px;
    color: #787f88;
    width: 87%;
    text-overflow: ellipsis;
  }
`;

const StyledDialogTitle = styled(DialogTitle)`
  &.MuiDialogTitle-root {
    padding: ${({ padding }) => padding || '20px 24px'};
    border-bottom: ${({ $noborder }) => ($noborder ? 'none' : '1px solid rgba(193, 195, 198, 0.2)')};
    ${defaultFont};
    font-size: 18px;
    line-height: 29px;
    font-weight: 600;
  }
`;

const StyledButton = styled.button`
  margin: 0;
  padding: 0;
  border: 0;
  background-color: ${({ $bgcolor }) => $bgcolor || 'transparent'};
  position: absolute;
  right: ${({ right }) => right || '24px'};
  top: ${({ top }) => top || '14px'};
  width: 40px;
  height: 40px;
  border-radius: ${({ $borderRadius }) => $borderRadius || '8px'};
  overflow: hidden;
  transition: all 0.3s ease-out;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  &:hover {
    background-color: ${({ $hoverBg }) => $hoverBg || '#f5f6f7'};
  }
`;

const StyledGoBackButton = styled(StyledButton)`
  right: auto;
  left: ${({ left }) => left || '24px'};
`;

const StyledScrollIndicator = styled.div`
  position: absolute;
  height: 38px;
  left: ${({ left }) => left || '0px'};
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.05) 100%);

  ${({ width }) => width && `width: ${width}`};
  transition: all 0.3s ease-out;
  opacity: ${({ scrollEnd }) => (scrollEnd ? 0 : 1)};
  visibility: ${({ scrollEnd }) => (scrollEnd ? 'hidden' : 'visible')};
`;

export {
  StyledDialog,
  StyledButton,
  StyledGoBackButton,
  StyledDialogActions,
  StyledDialogContent,
  StyledDialogTitle,
  StyledPaper,
  StyledDialogContentText,
  paddingX,
  paddingY,
  StyledScrollIndicator,
};
