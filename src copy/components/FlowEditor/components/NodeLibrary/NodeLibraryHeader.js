import PropTypes from 'prop-types';
import React from 'react';
import ExpandMoreRounded from '@material-ui/icons/ExpandMoreRounded';
import ExpandLessRounded from '@material-ui/icons/ExpandLessRounded';
import Box from '@material-ui/core/Box';
import { L14M } from '../../../atoms';
import TabHeader from './Tabs/TabHeader';
import { StyledButton, IconWrapper, StyledTabHeaderWrapper } from './styled';
import THEME from '../../../../constants/theme';
import { TABS_SETTINGS } from './Tabs/constant';

const NodeLibraryHeader = ({ setTabValue, toggleDrawerStatus, drawerStatus, isInstructAutomation, tabValue }) => {
  const tabLabel = tabValue === TABS_SETTINGS.nodes.value ? 'Nodes' : 'Recipes';

  const handleDrawerStatus = (e) => {
    e.stopPropagation();
    toggleDrawerStatus();
  };
  return (
    <StyledTabHeaderWrapper
      $open={drawerStatus}
      $isInstructAutomation={true}
      {...((!drawerStatus || !isInstructAutomation) && { onClick: handleDrawerStatus })}
    >
      {drawerStatus ? (
        <TabHeader setTabValue={setTabValue} />
      ) : (
        <Box pl="4px">
          <L14M>{tabLabel}</L14M>
        </Box>
      )}

      <StyledButton open={drawerStatus} onClick={handleDrawerStatus}>
        {drawerStatus ? (
          <IconWrapper $color={THEME.greyColors.grey17}>
            <ExpandMoreRounded size="m" />
          </IconWrapper>
        ) : (
          <IconWrapper $color={THEME.greyColors.grey17}>
            <ExpandLessRounded size="m" />
          </IconWrapper>
        )}
      </StyledButton>
    </StyledTabHeaderWrapper>
  );
};

NodeLibraryHeader.propTypes = {
  drawerStatus: PropTypes.bool.isRequired,
  setTabValue: PropTypes.func.isRequired,
  toggleDrawerStatus: PropTypes.func.isRequired,
  isInstructAutomation: PropTypes.bool,
  tabValue: PropTypes.string.isRequired,
};

NodeLibraryHeader.defaultProps = {
  isInstructAutomation: false,
};

export default NodeLibraryHeader;
