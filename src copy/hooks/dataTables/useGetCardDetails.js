import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { GET_CARD } from '../../utils/queries/dataTables/cards';
import { useNotificationManager } from '../useNotificationManager';

export const useGetCardDetails = () => {
  const { detailsId: token } = useParams();

  const { error, loading, data } = useQuery(GET_CARD, { variables: { token } });
  const { t } = useTranslation();

  useNotificationManager('error', t(error?.message), 'Data tables', 5000);

  const card = useMemo(() => data?.getCard ?? {}, [data]);

  return { error, loading, card };
};
