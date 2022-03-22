import ReactFlow from 'react-flow-renderer';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { Box, withStyles } from '@material-ui/core';
import defaultFont from '../atoms/defaultFont';
import { paddingY } from '../Dialog/styled';
import THEME from '../../constants/theme';

export const CanvasContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-grow: 1;
  background-color: #f5f6f7;
`;

export const nodeBaseStyles = {
  style: {
    display: 'flex',
  },
};

export const COLORS = {
  conditionalGreen: '#1CCEA4',
  conditionalRed: '#DF5B8B',
};
export const VALUE_COLORS = ['#ECAB3D', '#E55B4D', '#1CCEA4', '#7D7B3F', '#E55B4D'];

export const StyledReactFlow = styled(ReactFlow)`
  &:active {
    cursor: grabbing;
  }
`;

export const StyledDialog = styled(Dialog)`
  &.MuiDialog-root {
    margin: 0;
    height: 100%;
    max-height: 100%;
    & .MuiBackdrop-root {
      background-color: rgba(193, 195, 198, 0.4) !important;
    }
    & .MuiDialog-container {
      justify-content: flex-end;
    }
    & .MuiDialog-paper {
      margin: 0;
      box-shadow: none;
    }
    & .MuiDialog-paperWidthSm {
      max-width: 440px;
    }
    & .MuiDialog-paperWidthLg {
      max-width: 784px;
    }
    & .MuiDialog-paperScrollPaper {
      max-height: 100%;
      height: 100%;
    }
  }
`;

export const StyledDialogTitle = styled(DialogTitle)`
  &.MuiDialogTitle-root {
    padding: 24px 32px;
    border-bottom: 1px solid rgba(193, 195, 198, 0.2);
    font-size: 18px;
    font-weight: 600;
    top: 0;
    position: sticky;
    background: ${THEME.primaryColors.white};
    z-index: 1;
    ${defaultFont};
  }
`;

export const StyledDialogContent = styled(DialogContent)`
  &.MuiDialogContent-root {
    padding: 0 ${({ px }) => px ?? paddingY};
    margin-top: 32px;
    overflow: visible;
  }
`;

export const StyledBox = withStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
})(Box);
