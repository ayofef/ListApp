import React from 'react';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';
import Drawer from '@material-ui/core/Drawer';
import THEME from '../../constants/theme';

export const DashboardWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
`;

export const MainContent = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const AddsColumn = styled.div`
  position: relative;
  width: 246px;
  flex-shrink: 0;
  margin-top: 12px;
`;

export const Add = styled.div`
  width: 246px;
  border-radius: 8px;
  background: ${THEME.secondaryColors.black};
  height: 368px;
  padding: 24px;
  box-sizing: border-box;
  overflow: hidden;
  position: fixed;

  .background {
    position: absolute;
    right: 0;
    bottom: 0;
  }
`;

export const StyledScrollbars = styled(({ showScrollbar: omit, ...props }) => <Scrollbars {...props} />)`
  width: 100%;
  height: 100%;
  overflow: unset !important;
  padding-right: 40px;

  & > div {
    margin-right: 0 !important;
  }

  ${({ showScrollbar }) => {
    if (showScrollbar) {
      return `
      *::-webkit-scrollbar {
        height: 7px;
      }

      *{
        overflow-y: hidden!important;
      }
      *::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 3px rgba(0,0,0,0.4);
          border-radius: 8px;
          -webkit-border-radius: 8px;
      }

      *::-webkit-scrollbar-thumb {
          -webkit-border-radius: 10px;
          border-radius: 10px;
          background: rgba(100,100,100,0.8);
          -webkit-box-shadow: inset 0 0 3px rgba(0,0,0,0.5);
      }
    `;
    }
    return '';
  }};
`;

export const StyledDrawer = styled(Drawer)`
  & > div {
    width: 256px;
    flex-shrink: 0;
    background-color: rgb(248, 249, 250) !important;
  }
`;

export const StyledBox = styled.div`
  white-space: 'nowrap';
  text-overflow: ellipsis;

  & > a {
    transition: all 0.2s ease-out;

    &:hover {
      color: ${({ hover }) => (hover ? '#787f88' : '')};
    }
  }
`;
