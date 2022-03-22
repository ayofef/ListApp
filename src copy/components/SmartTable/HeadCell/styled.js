import styled, { css } from 'styled-components';
import { TableCell, withStyles } from '@material-ui/core';

const displayNone = css`
  opacity: 0;
  visibility: hidden;
  transition: 0.3s;
`;

const displayVisible = css`
  opacity: 1 !important;
  visibility: visible !important;
`;

const draggingStyles = css`
  border-radius: 8px 8px 0 0;
  padding: 8px 10px;
  box-shadow: 0 7px 12px rgba(82, 87, 92, 0.11);
  height: 100vh !important;
  overflow: hidden;
  background-color: #fff;
  border: 1px solid #e6e9ec;

  &::before,
  &::after {
    content: '';
    display: block;
    height: 1px;
  }

  &::before {
    position: absolute;
    background-color: #787f88;
    width: 12px;
    border-radius: 2px;
    top: 4px;
    left: 50%;
    transform: translateX(-50%);
  }

  &::after {
    position: relative;
    background-color: #e6e9ec;
    width: 200%;
    top: 4px;
    left: -20px;
  }
`;

const StyledHeadContent = styled.div`
  position: relative;
  padding-bottom: 6px;
  z-index: 100;
  width: 100%;

  ${({ isDragging }) => isDragging && draggingStyles};

  & .dragHandle {
    content: '';
    position: absolute;
    display: flex;
    top: -4px;
    left: 0;
    color: red;
    width: 100%;
    height: 10px;
    padding-bottom: 5px;
    justify-content: center;
    align-items: center;
    ${displayNone};
  }

  & .headerControl {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;

    /*drop down menu*/
    & > :last-child {
      ${displayNone};
    }
  }

  &:hover {
    .dragHandle,
    .headerControl {
      ${displayVisible}
      & > :last-child {
        ${displayVisible}
      }
    }
  }
`;
const StyledResizer = styled.div`
  position: absolute;
  top: 5px;
  right: 0;
  background-color: rgba(105, 68, 255, 0.3);
  height: 90%;
  width: 3px;
  border-radius: 3px;
  user-select: none;
  ${displayNone}
`;
const StyledDropIndicator = styled.div`
  position: absolute;
  top: 42px;
  left: ${({ isGreater }) => (isGreater ? '99%' : '0')};
  background-color: rgba(105, 68, 255, 0.3);
  height: 100vh;
  width: 3px;
  border-radius: 3px;
  user-select: none;
  z-index: 10;
  transform-origin: top;
  transition: transform 0.35s ease;
  transform: ${({ destinationActive }) => (destinationActive ? 'scaleY(1)' : 'scaleY(0)')};
  opacity: ${({ destinationActive }) => (destinationActive ? '1' : '0')};
`;

const StyledTableCell = withStyles({
  root: {
    position: 'relative',
    width: ({ currentcellwidth }) => currentcellwidth,
    minWidth: ({ currentcellwidth }) => currentcellwidth,

    '&::before': {
      content: '""',
      position: 'absolute',
      display: 'block',
      top: '0',
      left: '0',
      width: '100%',
      height: '100vh',
      backgroundColor: '#E6E9EC',
      padding: '20px 10px',
      borderRadius: '8px 8px 0 0',
      zIndex: 200,
      opacity: ({ issourceactive }) => (issourceactive ? '1' : '0'),
      visibility: ({ issourceactive }) => (issourceactive ? 'visible' : 'hidden'),
    },

    '&:hover': {
      '& .resizer': {
        opacity: '1',
        visibility: 'visible',
      },
    },
  },
})(TableCell);

export { StyledHeadContent, displayNone, displayVisible, StyledTableCell, StyledResizer, StyledDropIndicator };
