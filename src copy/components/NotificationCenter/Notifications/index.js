import React from 'react';
import { useQuery } from '@apollo/client';
import { func } from 'prop-types';
import moment from 'moment';
import Box from '@material-ui/core/Box';
import isEmpty from 'lodash/isEmpty';
import NotificationItem from './NotificationIem';
import ListEmptyState from '../EmptyState';
import { StyledListContainer } from '../styled';
import { GET_LIST_NOTIFICATIONS } from '../queries';
import { useNotificationManager } from '../../../hooks/useNotificationManager';
import ListSkeleton from '../../ListSkeleton';

const TITLE = 'There are no notifications';
const DESC = 'Notifications will appear here.';

const Notifications = ({ toggleNotification }) => {
  const { loading, error, data } = useQuery(GET_LIST_NOTIFICATIONS);

  useNotificationManager('error', error?.message, 'Fetch required notifications');

  const notifications = data?.listNotifications ?? [];
  const sortedNotifications = [...notifications]?.sort((a, b) => moment(b?.created).diff(a?.created));

  return (
    <StyledListContainer>
      {loading && (
        <Box mt="-8px">
          <ListSkeleton rowNumber={5} height={80} />
        </Box>
      )}

      {!loading &&
        !isEmpty(notifications) &&
        sortedNotifications.map((item) => (
          <NotificationItem
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            timeStamp={item?.created}
            status={item.status}
            action={item.action}
            toggleNotification={toggleNotification}
          />
        ))}

      {!loading && isEmpty(notifications) && <ListEmptyState title={TITLE} description={DESC} type="actions" />}
    </StyledListContainer>
  );
};

Notifications.propTypes = {
  toggleNotification: func.isRequired,
};

export default Notifications;
