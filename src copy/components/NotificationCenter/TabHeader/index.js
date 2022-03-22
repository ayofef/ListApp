import React from 'react';
import { useQuery } from '@apollo/client';
import { func } from 'prop-types';
import Box from '@material-ui/core/Box';
import CloseIcon from '@material-ui/icons/Close';
import TabList from '@material-ui/lab/TabList';
import { StyledHeader, StyledTab, StyledIconButton } from './styled';
import { generateTabs, a11yProps } from '../constant';
import { GET_LIST_NOTIFICATIONS_SIMPLE, GET_LIST_REQUIRES_ACTIONS_SIMPLE } from '../queries';
import { NOTIFICATION_STATUS } from '../Notifications/constant';

const ID = `notifications-tabs`;

const TabHeader = ({ setTabValue, toggleNotification }) => {
  const { data: notificationsData } = useQuery(GET_LIST_NOTIFICATIONS_SIMPLE);
  const { data: actionsData } = useQuery(GET_LIST_REQUIRES_ACTIONS_SIMPLE);

  const newNotifications = notificationsData?.listNotifications?.filter(
    (notification) => notification.status === NOTIFICATION_STATUS.fired
  ).length;

  const newActions = actionsData?.listRequiresAction.length;

  const tabs = generateTabs(newNotifications, newActions);

  const handleChange = (event, newValue) => {
    event.stopPropagation();
    setTabValue(newValue);
  };

  return (
    <Box position="relative">
      <StyledHeader>
        <TabList onChange={handleChange} aria-label={ID} id={ID}>
          {tabs.map(({ label, value }) => {
            const { id, ariaControls } = a11yProps(value);

            return <StyledTab key={label} label={label} value={value} aria-controls={ariaControls} id={id} />;
          })}
        </TabList>
      </StyledHeader>

      <StyledIconButton onClick={toggleNotification} size="small">
        <CloseIcon />
      </StyledIconButton>
    </Box>
  );
};

TabHeader.propTypes = {
  setTabValue: func.isRequired,
  toggleNotification: func.isRequired,
};

export default TabHeader;
