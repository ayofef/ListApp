import styled from 'styled-components';
import Drawer from '@material-ui/core/Drawer';
import TabPanel from '@material-ui/lab/TabPanel';

const StyledDrawer = styled(Drawer)`
  & .MuiBackdrop-root {
    background-color: rgba(193, 195, 198, 0.4) !important;
  }

  & .MuiDrawer-paper {
    background: #fff;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04), 0px 10px 14px rgba(0, 0, 0, 0.04);
  }
`;

const StyledWrapper = styled.div`
  & .MuiTabs-root {
    overflow: unset;

    & .MuiTabs-flexContainer {
      border-bottom: 1px solid #e6e9ec;
      & > :not(:last-child) {
        margin-right: 32px;
      }
    }
    & .MuiTabs-scroller {
      overflow: unset !important;
    }
    & .MuiButtonBase-root {
      text-transform: capitalize;
      color: #787f88;
      position: relative;
      font-weight: 500;
      font-size: 14px;
      padding: 0;
      min-width: unset;
      max-height: unset;

      &:hover {
        color: #5a5a5a;
      }

      &.Mui-selected {
        color: #4e40ef;
      }
    }
    & .MuiTabs-indicator {
      bottom: 0;
      z-index: 100;
      background-color: #4e40ef;
      border-radius: 8px;
    }
  }

  & .MuiTabPanel-root {
    padding: 0;
    margin-top: 24px;
  }
`;

const StyledPanel = styled(TabPanel)`
  &.MuiTabPanel-root {
    margin-top: 8px;
  }
`;

const StyledListContainer = styled.div`
  height: calc(100vh - 91.5px);
  overflow-y: scroll;
  padding: 0 8px;
`;

export { StyledWrapper, StyledDrawer, StyledPanel, StyledListContainer };
