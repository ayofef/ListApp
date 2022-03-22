import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import TabContext from '@material-ui/lab/TabContext';
import TabHeader from './TabHeader';
import { StyledWrapper, StyledDrawer, StyledPanel } from './styled';
import Actions from './Actions';
import Notifications from './Notifications';

const NotificationCenter = ({ toggleNotification, isOpen }) => {
  const [tabValue, setTabValue] = useState('0');

  return (
    <StyledDrawer anchor="right" open={isOpen} onClose={toggleNotification}>
      <Box width="440px">
        <TabContext value={tabValue}>
          <StyledWrapper>
            <TabHeader setTabValue={setTabValue} toggleNotification={toggleNotification} />

            <StyledPanel value="0">
              <Notifications toggleNotification={toggleNotification} />
            </StyledPanel>

            <StyledPanel value="1">
              <Actions toggleNotification={toggleNotification} />
            </StyledPanel>
          </StyledWrapper>
        </TabContext>
      </Box>
    </StyledDrawer>
  );
};

NotificationCenter.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleNotification: PropTypes.func.isRequired,
};

export default NotificationCenter;
