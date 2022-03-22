import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { useNotificationManager } from './useNotificationManager';
import { PEOPLE_PAGE } from '../utils/queries/billing';

export const useGetInvitedUsers = () => {
  const { error, loading, data } = useQuery(PEOPLE_PAGE);
  const { t } = useTranslation();

  useNotificationManager('error', t(error?.message), t('Error'), 5000);

  const users = useMemo(() => data?.listUsers || [], [data?.listUsers]);

  return { error, loading, users };
};
