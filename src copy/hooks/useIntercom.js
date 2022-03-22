import { useCallback, useEffect, useState } from 'react';
import { useIntercom as useIntercoms } from 'react-use-intercom';
import { gql, useQuery } from '@apollo/client';
import { useNotificationManager } from './useNotificationManager';

const useIntercom = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [intercomCloseButton, setIntercomCloseButton] = useState(false);

  const toggleIntercomCloseButton = useCallback(() => setIntercomCloseButton((prevState) => !prevState), []);
  const { error, data } = useQuery(gql`
    query getIntercomUser {
      me {
        id
      }
    }
  `);

  useNotificationManager('error', error?.message, 'Fetch Intercom User');
  const userId = data?.me?.id;
  const { show, boot, shutdown, hide, startTour } = useIntercoms();

  const toggleIntercom = useCallback(() => {
    setIsOpen((prevState) => !prevState);

    if (isOpen) {
      hide();
      shutdown();
      toggleIntercomCloseButton();
      return;
    }

    boot({ userId });
    show();
    setTimeout(() => {
      toggleIntercomCloseButton();
    }, 1500);
  }, [hide, isOpen, show, shutdown, toggleIntercomCloseButton, boot, userId]);

  useEffect(() => {
    if (userId) {
      boot({ userId });
    }
    return () => shutdown();
  }, [userId, boot, shutdown]);
  const startDemoTour = () => startTour(process.env.REACT_APP_INTERCOM_TOUR_ID);

  return { toggleIntercom, intercomCloseButton, intercomIsOpen: isOpen, startDemoTour };
};

export { useIntercom };
