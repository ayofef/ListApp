import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useApolloClient, useMutation } from '@apollo/client';
import { NotificationManager } from 'react-notifications';
import { SWITCH_TEAM } from '../utils/queries/workspaces/workspacesMutations';
import { useGlobalContext } from '../containers/App/context';
import { setStorageValue } from '../client/links/demoLink/storage';
import { useUserDispatch } from '../providers/User/UserContext';
import { setIsDemo } from '../providers/User/state/actions';

const TITLE = 'Team switch error';
const TOAST_TIMEOUT = 5000;

const useSwitchTeam = () => {
  const { t } = useTranslation();
  const userDispatch = useUserDispatch();
  const client = useApolloClient();
  const [switchTeamPromise] = useMutation(SWITCH_TEAM);
  const { setRefreshToken, setToken, logOut } = useGlobalContext();

  return useCallback(
    async (id) => {
      setStorageValue(false);
      let token;
      let refreshToken;
      // get new tokens
      try {
        const { errors, data } = await switchTeamPromise({ variables: { id } });
        const switchTeams = data?.switchTeams;
        token = switchTeams?.token;
        refreshToken = switchTeams?.refreshToken;

        if (errors) {
          NotificationManager.error(t('uiMessages.error'), t(TITLE), TOAST_TIMEOUT);
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }

      if (!token || !refreshToken) {
        NotificationManager.error(t('Tokens are corrupted.'), t(TITLE), TOAST_TIMEOUT);
        return;
      }

      setToken(token);
      setRefreshToken(refreshToken);
      userDispatch(setIsDemo(false));
      // resetStore
      try {
        await client.resetStore();
      } catch (e) {
        logOut();
        NotificationManager.error(t('Failed reset store.'), t(TITLE), TOAST_TIMEOUT);
        // eslint-disable-next-line no-console
        console.error(e);
      }
    },
    [client, logOut, setRefreshToken, setToken, switchTeamPromise, t, userDispatch]
  );
};

export { useSwitchTeam };
