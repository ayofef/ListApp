import styled, { css, keyframes } from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import IconButtonBase from '@material-ui/core/IconButton';
import { EdgeText } from 'react-flow-renderer';
import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const dash = keyframes`
  from {
    stroke-dashoffset: 1000;
  }
  to {
    stroke-dashoffset: 0;
  }
`;

const PathAnimation = css`
  animation: ${dash} 3s linear forwards;
  stroke-dasharray: 1000;
  stroke-dashoffset: 0;
`;

export const StyledPath = styled.path`
  stroke: #4e40ef;
  stroke-width: 1.5;
  ${PathAnimation};
`;

export const StyledIconButton = withStyles({
  root: {
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    visibility: 'visible',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    padding: '0',
    backgroundColor: '#000',
    '&:hover': {
      backgroundColor: '#000',
    },
  },
})(IconButtonBase);

export const StyledEditButton = styled(StyledIconButton)`
  &.MuiButtonBase-root {
    visibility: hidden;
    width: 16px;
    height: 16px;
  }
`;

export const StyledMoreHorizIcon = withStyles({
  root: {
    width: '100%',
    height: '100%',
    fontSize: '16px',
  },
})(MoreHorizIcon);

export const StyledWrapper = styled(Box)`
  display: flex;
  align-items: center;
  position: relative;
`;

export const StyledEdgeText = styled(EdgeText)`
  font-size: 10px;
  font-weight: 600;
  line-height: 12px;
  color: #787f88;
  letter-spacing: 0.1px;
  text-transform: uppercase;
`;

export const StyledLabel = styled.div`
  font-size: 10px;
  font-weight: 600;
  line-height: 12px;
  color: ${({ $color }) => $color || '#787f88'};
  letter-spacing: 0.1px;
  text-align: center;
  text-transform: uppercase;
  padding: 5px 8px;
  background-color: #f5f6f7;
  cursor: default;
`;

export const OpBox = styled.span`
  text-transform: lowercase;
`;

export const StyledPopover = styled(Popover)`
  & .MuiPaper-root {
    background-color: transparent;
    border: none !important;
    border-radius: 6px !important;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.04), 0 0 14px rgba(0, 0, 0, 0.04) !important;
  }
`;

export const StyledLabelWrapper = styled(Box)`
  display: flex;
  align-items: center;
  &:hover {
    .MuiButtonBase-root {
      visibility: visible;
    }
  }
`;
