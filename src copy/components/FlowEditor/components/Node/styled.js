import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Handle } from 'react-flow-renderer';
import styled from 'styled-components';
import IconButtonBase from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CloseIcon from '@material-ui/icons/Close';
import Popper from '@material-ui/core/Popper';
import THEME from '../../../../constants/theme';
import { L10B } from '../../../atoms/Typography/L10B';

export const inputHandleStyle = {
  top: 0,
  visibility: 'hidden',
  left: '50%',
};

export const sourceHandleStyle = {
  backgroundColor: '#000',
  borderColor: '#000',
  zIndex: '-1',
  width: '9px',
  height: '9px',
  transform: 'translate(3px, -4px)',
};

export const inputHandleActiveStyle = {
  width: '195px',
  height: '100%',
  borderRadius: '12px',
  top: 0,
  left: '50%',
  background: 'transparent',
  borderColor: 'transparent',
};

export const inputConditionHandleActiveStyle = {
  width: '88px',
  height: '88px',
  borderRadius: '50%',
  top: 0,
  left: '50%',
  background: 'transparent',
  borderColor: 'transparent',
};

export const TargetHandle = styled(Handle)`
  background-color: transparent;
  border-color: transparent;
  margin-left: -3px;
  height: 100%;
  width: calc(100% + 5px);
  border-radius: 6px;
  visibility: ${({ connecting }) => (connecting ? 'visible' : 'hidden')};
`;

export const StartTestNodeHandle = styled(Handle)`
  width: 0;
  height: 0;
  visibility: hidden;
  right: 0;
`;

export const TestNodeTargetHandle = styled(Handle)`
  width: 0;
  height: 0;
  visibility: hidden;
  left: 0;
`;

export const StyledPopper = styled(Popper)`
  z-index: 1299;
`;

export const StyledBottomHandle = styled(({ backgroundColor, ...rest }) => <Handle {...rest} />)`
  width: 22px;
  height: 22px;
  min-width: 22px;
  background: ${({ backgroundColor = '#c1c3c6' }) => backgroundColor};
  border: 0;
  z-index: -1;
  bottom: 0;
  position: relative;
  left: auto;
  transform: none;
  margin-left: 6.5px;
  margin-right: 6.5px;

  :hover,
  :active {
    background: #3023c8;
  }
`;

export const StyledBottomHandleContainer = withStyles({
  root: {
    pointerEvents: 'none',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: '-1',
  },
})(Box);

export const NodeRowLShape = styled.div`
  margin-left: 11px;
  margin-bottom: 11px;
  height: 12px;
  width: 12px;
  border-left: 1px solid #c1c3c6;
  border-bottom: 1px solid #c1c3c6;
  margin-right: 4px;
`;

export const ButtonContainer = styled.div`
  cursor: pointer;
  width: 24px;
  padding-left: 8px;
  padding-bottom: 8px;
`;

export const StyledGrabbableBox = styled(Box)`
  cursor: default;
  box-sizing: border-box;
  position: relative;
  &:active {
    cursor: grabbing;
  }

  & .ellipse-container {
    & p {
      & div {
        max-width: 140px;
        text-overflow: ellipsis;
        overflow-x: hidden;
      }
    }
  }
`;

export const StyledIconButton = withStyles({
  root: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    color: '#fff',
    '& .MuiIconButton-label': {
      width: '24px',
      height: '24px',
    },
  },
})(IconButtonBase);

export const StyledBadge = withStyles({
  root: {
    display: 'flex',
    position: 'absolute',
    bottom: '9px',
    right: '9px',
    backgroundColor: ({ bgColor }) => bgColor || THEME.primaryColors.primary,
    cursor: ({ cursor }) => cursor || 'default',
    width: '14px',
    height: '14px',
    borderRadius: '50%',
    color: '#fff',
  },
})(Box);

const createStyledIcon = (Icon) =>
  withStyles({
    root: {
      width: '100%',
      height: '100%',
    },
  })(Icon);

export const StyledMoreHorizIcon = createStyledIcon(MoreHorizIcon);

export const StyledCheckIcon = createStyledIcon(CheckIcon);

export const StyledCloseIcon = createStyledIcon(CloseIcon);

export const StyledBox = styled(Box)`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f5f6f7;
  padding: 10px 16px;
  cursor: ${({ cursor }) => cursor || 'default'};
`;

export const StyledIconWrap = styled(Box)`
  display: flex;
  align-items: center;
  margin-right: ${({ marginRight }) => marginRight || '22px'};
`;

export const MoreWrapper = styled(Box)`
  position: absolute;
  right: 16px;
  top: 16px;
`;

export const MoreButton = styled(Box)`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
`;

export const ErrorDot = styled(Box)`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${THEME.statusColors.failed};
  position: absolute;
  bottom: 18px;
  right: 18px;
`;

export const StyledL10B = styled(L10B)`
  letter-spacing: 0;
`;

export const EmptyNodeWrapper = styled(Box)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${THEME.greyColors.grey5};
  border-radius: 6px;
`;

export const PopperWrapper = styled(Box)`
  background: ${THEME.primaryColors.white};
  border-radius: 12px;
`;

export const NodeNameBox = styled(Box)`
  color: #787f88;
  font-size: 12px;
  line-height: 16px;
  max-width: 70%;
`;
