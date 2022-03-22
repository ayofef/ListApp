import { useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import compact from 'lodash/compact';
import { GET_API_KEY_LIST } from '../../../utils/queries/apiKey/apiKeysQueries';
import { useGlobalContext } from '../../../containers/App/context';
import { globalLoadingConst } from '../../../constants/globalLoadingConsts';
import { useNotificationManager } from '../../../hooks/useNotificationManager';

export const API_KEY_MUTATION_OPTION = {
  refetchQueries: [{ query: GET_API_KEY_LIST }],
  awaitRefetchQueries: true,
};

export const useGetAPIKeyList = () => {
  const { setGlobalLoading } = useGlobalContext();
  const { t } = useTranslation();
  const { data, error, loading, refetch } = useQuery(GET_API_KEY_LIST);
  useNotificationManager('error', t(error?.message), t('API Keys'), 5000);

  useEffect(() => {
    setGlobalLoading(globalLoadingConst.apiKeys, !data && loading);
    return () => {
      setGlobalLoading(globalLoadingConst.apiKeys, false);
    };
  }, [loading, data, setGlobalLoading]);

  const apiKeyList = useMemo(() => compact(data?.listApiKeys || []), [data?.listApiKeys]);
  return {
    apiKeyList,
    error,
    loading,
    refetch,
  };
};
