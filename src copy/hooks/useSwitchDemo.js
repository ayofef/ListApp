import { useApolloClient } from '@apollo/client';
import { useCallback } from 'react';
import { setStorageValue } from '../client/links/demoLink/storage';
import { useUserDispatch, useUserSelector } from '../providers/User/UserContext';
import { setIsDemo, setIsSwitching } from '../providers/User/state/actions';
import { selectIsDemo } from '../providers/User/state/selectors';
import { useIntercom } from './useIntercom';

const NOTIFICATION_TITLE = 'Switch User';

const useSwitchDemo = () => {
  const client = useApolloClient();
  const userDispatch = useUserDispatch();
  const currentIsDemo = useUserSelector(selectIsDemo);
  const { startDemoTour } = useIntercom();

  return useCallback(
    (shouldStartDemo) => {
      const nextIsDemo = !currentIsDemo;
      setStorageValue(nextIsDemo);
      userDispatch(setIsSwitching(true));

      client
        .resetStore()
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(`${NOTIFICATION_TITLE} Error:\n`, err);
        })
        .finally(() => {
          userDispatch(setIsDemo(nextIsDemo));
          userDispatch(setIsSwitching(false));
          if (typeof shouldStartDemo === 'boolean' && shouldStartDemo) {
            startDemoTour();
          }
        });
    },
    [currentIsDemo, userDispatch, client, startDemoTour]
  );
};

export { useSwitchDemo };
