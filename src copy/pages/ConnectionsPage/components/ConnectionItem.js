import React, { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { string, shape } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Box } from '@material-ui/core';
import { ConnectionTile, ConnectionTileLogo, StyledButton } from '../styled';
import { UI_ROUTES } from '../../../constants/routes';
import EditableField from './EditableField';
import { useHandleConnectionConnect } from '../../../hooks/connectionsHooks';
import { globalLoadingConst } from '../../../constants/globalLoadingConsts';
import { useGlobalContext } from '../../../containers/App/context';
import { P12 } from '../../../components/atoms';
import { CONNECTION_STATUS } from './constant';
import THEME from '../../../constants/theme';
import { useEditableFieldHook } from '../hooks/useEditableFieldHook';
import { generateUserPilotAttribute } from '../../../constants/generateUserPilotLabel';
import { USER_PILOT_SECTION_ID } from '../constant';

const TOAST_TEXT_MAP = {
  [CONNECTION_STATUS.CONNECTED]: 'disconnected',
  [CONNECTION_STATUS.BROKEN]: 'reconnected',
  [CONNECTION_STATUS.ARCHIVED]: 'reconnected',
  DEFAULT: 'updated',
};

const CTA_BUTTON_TEXT_MAP = {
  [CONNECTION_STATUS.CONNECTED]: 'Connected',
  [CONNECTION_STATUS.NOT_CONNECTED]: 'Connect',
  [CONNECTION_STATUS.ARCHIVED]: 'Reconnect',
  [CONNECTION_STATUS.BROKEN]: 'Reconnect',
};

const RECONNECT_CONNECTION_STATUS = [CONNECTION_STATUS.BROKEN, CONNECTION_STATUS.ARCHIVED];

const ConnectionsItem = ({ connection }) => {
  const { t } = useTranslation();
  const { push } = useHistory();
  const { handleReconnect, renderConnectionForm } = useHandleConnectionConnect({ connection });
  const companyName = useMemo(() => connection?.name || connection?.company?.name, [connection]);
  const { nameText, setNameText, handleFieldReset, handleSubmitName } = useEditableFieldHook(connection);
  const { setGlobalLoading } = useGlobalContext();
  const subText = connection?.company?.categories?.[0] ?? '';
  const ctaButtonText = CTA_BUTTON_TEXT_MAP[connection?.status];
  const connectionStatus = connection.status;
  const isBrokenConnection = connectionStatus === CONNECTION_STATUS.BROKEN;

  const handleConnectionPick = (param) => {
    push(`${UI_ROUTES.connections}/details/${connection.id}${typeof param === 'string' ? param : ''}`);
  };

  useEffect(() => {
    setNameText(companyName || '');
    return () => {
      setGlobalLoading(globalLoadingConst.connectionUpdate, false);
    };
  }, [connection, companyName, setGlobalLoading, setNameText]);

  const handleConnection = (e) => {
    e.stopPropagation();

    if (RECONNECT_CONNECTION_STATUS.includes(connectionStatus)) handleReconnect();
    else if (connectionStatus === CONNECTION_STATUS.NOT_CONNECTED) {
      handleConnectionPick('?connect=true');
    }
  };

  return (
    <ConnectionTile
      onClick={handleConnectionPick}
      isBrokenConnection={isBrokenConnection}
      {...generateUserPilotAttribute(USER_PILOT_SECTION_ID, 'connection_item', connection?.company?.name)}
    >
      <ConnectionTileLogo img={connection?.company?.logo} />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        flexShrink={1}
        flexGrow={1}
        ml="10px"
        overflow="hidden"
        px="4px"
      >
        {connection?.status === CONNECTION_STATUS.NOT_CONNECTED ? (
          <Box
            fontWeight="500"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            fontSize="14px !important"
            marginBottom="14px"
            lineHeight="20px"
          >
            {nameText}
          </Box>
        ) : (
          <Box>
            <EditableField
              nameText={nameText}
              updateValue={setNameText}
              value={nameText}
              reset={handleFieldReset}
              submit={handleSubmitName}
              height="26px"
              fontSize="14px !important"
              fontWeight="500"
              editingTransform="translateX(-2px)"
            />
          </Box>
        )}

        <Box mt="-10px">
          <P12 color="#545A61" lineHeight="14px" {...(isBrokenConnection && { color: THEME.statusColors.darkRed })}>
            {isBrokenConnection ? t('Broken') : subText}
          </P12>
        </Box>
      </Box>

      <Box display="flex" alignItems="flex-end" justifyContent="space-between">
        <StyledButton
          onClick={(e) => handleConnection(e)}
          type="button"
          color={connection?.status === CONNECTION_STATUS.CONNECTED ? 'secondary' : 'primary'}
          variant="contained"
          height="32px"
          borderRadius="6px"
          fontSize="13px"
          padding="6px 12px"
        >
          {t(ctaButtonText)}
        </StyledButton>
      </Box>
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
