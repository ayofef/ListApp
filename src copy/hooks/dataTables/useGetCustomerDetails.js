import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { GET_CUSTOMER, GET_LINKED_CARDS } from '../../utils/queries/dataTables/customers';
import { useNotificationManager } from '../useNotificationManager';

export const useGetCustomerDetails = () => {
  const { detailsId: id } = useParams();
  const { t } = useTranslation();

  const { error: customerError, loading: customerLoading, data } = useQuery(GET_CUSTOMER, { variables: { id } });
  const { error: cardError, loading: cardLoading, data: cardData } = useQuery(GET_LINKED_CARDS, { variables: { id } });

  const error = useMemo(() => customerError?.message || cardError?.message, [customerError, cardError]);

  const loading = useMemo(() => customerLoading || cardLoading, [customerLoading, cardLoading]);

  useNotificationManager('error', t(error?.message), 'Data tables', 5000);

  const customer = useMemo(() => data?.getCustomer ?? {}, [data]);
  const linkedCards = useMemo(() => cardData?.listCustomerCardsInternal ?? [], [cardData]);

  return { error, loading, customer, linkedCards };
};
