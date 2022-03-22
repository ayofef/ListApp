import styled from 'styled-components';
import TabPanel from '@material-ui/lab/TabPanel';
import Tab from '@material-ui/core/Tab';
import TabList from '@material-ui/lab/TabList';

import THEME from '../../../../../constants/theme';

const StyleTabPanel = styled(TabPanel)`
  &.MuiTabPanel-root {
    padding: 0;
    height: 100%;
  }
`;

const StyledTabList = styled(TabList)`
  & .MuiTabs-indicator {
    bottom: 0;
    z-index: 100;
    background-color: ${THEME.primaryColors.primary};
    border-radius: 8px;
  }
`;
const StyledTab = styled(Tab)`
  &.MuiTab-root {
    text-transform: capitalize !important;
    font-weight: 500 !important;
    letter-spacing: unset !important;
    color: ${THEME.greyColors.grey18};
    min-width: unset !important;
    padding: 16px 0;
    padding-bottom: 16px;
    margin-left: 12px;
    margin-right: 12px;

    &.Mui-selected {
        color: ${THEME.primaryColors.primary};
      }

    &:first-child {
    margin-left: 8px;
  }
`;

export { StyleTabPanel, StyledTabList, StyledTab };
