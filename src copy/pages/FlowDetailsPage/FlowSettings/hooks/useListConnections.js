import { useQuery } from '@apollo/client';

import { LIST_CONNECTIONS } from '../../../../utils/queries/flows/flowSettings/queries';
import { useNotificationManager } from '../../../../hooks/useNotificationManager';
import { usePaymentFlowContext } from '../../paymentFlowContext';
import useSearch from '../../../../hooks/useSearch';

const SORT_MAP = ['AZ', 'ZA'];
const getValue = (connection) => connection?.company?.name;

const sort = (connections, key) => {
  const sortFn = (a, b) => {
    const aValue = getValue(a);
    const bValue = getValue(b);
    return aValue?.localeCompare(bValue);
  };

  return [...connections]?.sort((a, b) => (key === 'AZ' ? sortFn(a, b) : sortFn(b, a)));
};

const filterItems = (connections, key) =>
  connections?.filter((el) => {
    const connectionName = getValue(el);
    return connectionName?.toLowerCase().includes(key.toLowerCase());
  });

const filterSort = (connections, filter) => {
  if (filter?.sort && filter?.search) {
    const filtered = filterItems(connections, filter?.search);
    return sort(filtered, filter?.sort);
  }
  if (filter?.search) {
    return filterItems(connections, filter?.search);
  }
  if (filter?.sort) {
    return sort(connections, filter?.sort);
  }

  return connections;
};

const useListConnections = ({ status = ['CONNECTED', 'BROKEN'], types = null, ids = null }) => {
  const { data, error, refetch, loading: dataLoading } = useQuery(LIST_CONNECTIONS, {
    variables: { types, status, ids },
  });
  const { loading: flowLoading } = usePaymentFlowContext();
  const loading = flowLoading || dataLoading;
  const [searchParams] = useSearch();
  useNotificationManager('error', error?.message, 'Flow, setting', 5000);

  const availableListConnections = data?.listConnections ?? [];
  const availableConnections = filterSort(availableListConnections, {
    search: searchParams?.search,
    sort: searchParams?.sort,
  });

  return {
    availableConnections,
    error,
    loading,
    refetch,
  };
};

export { SORT_MAP, useListConnections };
