import React, { createContext, useContext, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { useUserSelector } from '../User/UserContext';
import { selectIsDemo } from '../User/state/selectors';
import { GET_LIST_NOTIFICATIONS_SIMPLE } from '../../components/NotificationCenter/queries';
import { NOTIFICATION_STATUS } from '../../components/NotificationCenter/Notifications/constant';

const Context = createContext({});

const LeftAsideProvider = ({ children }) => {
  const isDemo = useUserSelector(selectIsDemo);
  const { data: notificationsData } = useQuery(GET_LIST_NOTIFICATIONS_SIMPLE, { skip: isDemo });
  const newNotifications = notificationsData?.listNotifications?.filter(
    (notification) => notification.status === NOTIFICATION_STATUS.fired
  );
  const notificationCount = newNotifications?.length;

  const value = useMemo(
    () => ({
      notificationCount,
    }),
    [notificationCount]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useHasNotification = () => {
  const { notificationCount } = useContext(Context);

  return Boolean(notificationCount);
};

export { useHasNotification, LeftAsideProvider };
