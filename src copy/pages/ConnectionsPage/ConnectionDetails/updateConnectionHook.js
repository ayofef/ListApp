import { NotificationManager } from 'react-notifications';
import { useTranslation } from 'react-i18next';
import isEmpty from 'lodash/isEmpty';
import { GET_CONNECTION_DETAILS, GET_CONNECTIONS } from '../../../utils/queries/connections/connectionsQueries';
import { TOAST_TEXT_MAP } from '../components/ConnectionsItem';
import {
  useHandleConnectionConnect,
  useUpdateConnectionData,
  GET_CONNECTION_LIST_VARIABLES,
} from '../../../hooks/connectionsHooks';

const mutateOption = (id) => ({
  refetchQueries: [
    { query: GET_CONNECTION_DETAILS, variables: { id } },
    { query: GET_CONNECTIONS, ...GET_CONNECTION_LIST_VARIABLES },
  ],
  awaitRefetchQueries: true,
});

export const useUpdateConnectionHook = ({ connection, callback }) => {
  const { handleConnect, handleReconnect, renderConnectionForm } = useHandleConnectionConnect({ connection, callback });
  const { disconnect } = useUpdateConnectionData(connection?.id);
  const { t } = useTranslation();

  const handleUpdate = (mutation) => {
    mutation({
      variables: { id: connection.id },
      ...mutateOption(connection.id),
    }).then((res) => {
      if (res && !isEmpty(res.errors)) {
        NotificationManager.error(t(res.errors[0]?.message ?? 'uiMessages.error'), 'Connections', 5000);
        return;
      }

      NotificationManager.success(
        t(`${connection?.company?.name} successfully ${TOAST_TEXT_MAP[connection?.status] ?? TOAST_TEXT_MAP.DEFAULT}`),
        'Connections',
        5000
      );
    });
  };

  const statusActionHandlers = {
    CONNECTED: {
      event: () => handleUpdate(disconnect),
      label: 'Disconnect',
    },
    BROKEN: { event: () => handleReconnect(), label: 'Reconnect' },
    ARCHIVED: { event: () => handleReconnect(), label: 'Reconnect' },
    NOT_CONNECTED: { event: () => handleConnect(), label: 'Connect' },
  };

  return { statusActionHandlers, renderConnectionForm, handleConnect };
};
