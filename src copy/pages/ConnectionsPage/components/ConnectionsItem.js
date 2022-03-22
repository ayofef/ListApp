import React, { useEffect, useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import { string, shape } from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import { useTranslation } from 'react-i18next';
import { NotificationManager } from 'react-notifications';
import { Box } from '@material-ui/core';
import isEmpty from 'lodash/isEmpty';
import { ConnectionTile, ConnectionTileLogo } from '../styled';
import DropDownMenu from '../../../components/menus/DropDownMenu';
import { UI_ROUTES } from '../../../constants/routes';
import EditableField from './EditableField';
import { useHandleConnectionConnect, useUpdateConnectionData } from '../../../hooks/connectionsHooks';
import { globalLoadingConst } from '../../../constants/globalLoadingConsts';
import { useGlobalContext } from '../../../containers/App/context';
import { P12 } from '../../../components/atoms';
import { GET_STATUS } from './constant';

const TOAST_TEXT_MAP = {
  CONNECTED: 'disconnected',
  BROKEN: 'reconnected',
  ARCHIVED: 'reconnected',
  DEFAULT: 'updated',
};

const TITLE = 'Connections';
const EMPTY_NAME_ERROR_MESSAGE = 'Connection name cannot be empty';
const SERVER_ERROR_MESSAGE = 'Server error';
const TOAST_TIMEOUT = 5000;

const ConnectionsItem = ({ connection }) => {
  const { disconnect, changeName } = useUpdateConnectionData(connection?.id);
  const { handleReconnect, renderConnectionForm } = useHandleConnectionConnect({ connection });
  const { setGlobalLoading } = useGlobalContext();
  const companyName = useMemo(() => connection?.name || connection?.company?.name, [connection]);

  const { t } = useTranslation();
  const [nameText, setNameText] = useState(companyName || '');
  const { push } = useHistory();

  const handleConnectionPick = () => {
    push(`${UI_ROUTES.connections}/details/${connection.id}`);
  };

  useEffect(() => {
    setNameText(companyName || '');
    return () => {
      setGlobalLoading(globalLoadingConst.connectionUpdate, false);
    };
  }, [connection, companyName, setGlobalLoading]);

  const handleUpdate = (mutation) => {
    mutation({
      variables: { id: connection.id },
    }).then((res) => {
      if (!isEmpty(res?.errors)) {
        NotificationManager.error(t(res.errors[0]?.message ?? 'uiMessages.error'), t(TITLE), TOAST_TIMEOUT);
        return;
      }

      NotificationManager.success(
        t(`${companyName} successfully ${TOAST_TEXT_MAP[connection?.status] ?? TOAST_TEXT_MAP.DEFAULT}`),
        t(TITLE),
        TOAST_TIMEOUT
      );
    });
  };

  const statusActionHandlers = {
    CONNECTED: { Disconnect: () => handleUpdate(disconnect) },
    BROKEN: { Reconnect: () => handleReconnect() },
    ARCHIVED: { Reconnect: () => handleReconnect() },
  };

  const connectionActions = [
    statusActionHandlers[connection.status] && statusActionHandlers[connection.status],
    connection.company?.domain && {
      [`${connection.company?.domain}`]: () => window.open(connection.company?.homepageUrl, '_blank'),
    },
  ];

  const handleFieldReset = () => {
    setNameText(companyName);
  };

  const handleSubmitName = () => {
    if (nameText.trim().length === 0) {
      setNameText(companyName);
      NotificationManager.error(t(EMPTY_NAME_ERROR_MESSAGE), t(TITLE), TOAST_TIMEOUT);

      return;
    }

    if (nameText !== connection?.name) {
      changeName({
        variables: {
          id: connection.id,
          name: nameText,
        },
      }).then((res) => {
        if (!isEmpty(res?.errors)) {
          NotificationManager.error(t(SERVER_ERROR_MESSAGE), t(TITLE), TOAST_TIMEOUT);
        }
      });
    }
  };

  return (
    <ConnectionTile onClick={handleConnectionPick}>
      <Box display="flex" width="100%" mb="14px" alignItems="flex-start">
        <ConnectionTileLogo img={connection?.company?.logo} />
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          flexShrink={1}
          flexGrow={1}
          mt="6px"
          ml="14px"
          overflow="hidden"
        >
          <EditableField
            nameText={nameText}
            updateValue={setNameText}
            value={nameText}
            reset={handleFieldReset}
            submit={handleSubmitName}
            fontSize="14px !important"
          />
        </Box>
        <Box alignSelf="flex-start" mt="-9px" mr="-12px">
          <DropDownMenu
            options={connectionActions}
            button={
              <IconButton>
                <MoreHoriz />
              </IconButton>
            }
            maxWidth="100%"
            id={connection?.id}
          />
        </Box>
      </Box>
      <P12 color="#787F88">{GET_STATUS[connection?.status]?.text}</P12>

      {renderConnectionForm()}
    </ConnectionTile>
  );
};

ConnectionsItem.propTypes = {
  connection: shape({
    status: string,
    name: string,
    id: string,
    company: shape({
      name: string,
      logo: string,
      domain: string,
    }),
  }).isRequired,
};

export default ConnectionsItem;
export { TOAST_TEXT_MAP };
