import React from 'react';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { func, string, shape } from 'prop-types';
import { BlockWrap, P, ButtonRounded } from '../../../components/atoms';
import { ConnectionTile, ConnectionTileLogo } from '../Directory/styled';
import THEME from '../../../constants/theme';
import { UI_ROUTES } from '../../../constants/routes';
import { useHandleConnectionConnect } from '../../../hooks/connectionsHooks';
import { FlexContainer } from '../../../components/atoms/flex/FlexContainer';

const DirectoryConnectionsItem = ({ connection, refetch }) => {
  const { push } = useHistory();
  const { handleConnect, renderConnectionForm } = useHandleConnectionConnect({ connection, callback: refetch });

  const handleConnectionPick = () => {
    if (connection.status === 'NOT_CONNECTED') {
      push(`${UI_ROUTES.connections}/details/${connection.id}`);
    }
  };

  const handleConnectEvent = (e) => {
    e.stopPropagation();
    handleConnect();
  };

  return (
    <ConnectionTile onClick={handleConnectionPick}>
      <FlexContainer cursor={connection.status === 'NOT_CONNECTED' ? 'pointer' : 'default'} width="100%">
        <ConnectionTileLogo isSquare={connection?.name === 'Square'}>
          <img src={connection?.company?.logo} alt={connection?.company?.name} />
        </ConnectionTileLogo>
        <BlockWrap flex={1} margin="0 0 0 24px">
          <P fontSize="20px" fontWeight="600">
            {connection?.company?.name}
          </P>
          <P fontSize="14px" margin="8px 0 0" color={THEME.greyColors.grey9}>
            {connection?.company?.categories[0]}
          </P>
          <Box mt="10px">
            <ButtonRounded
              height="28px"
              variant="contained"
              color="secondary"
              borderRadius="20px"
              padding="3px 14px 6px"
              likeDisabled
              link
              fontSize="14px"
              onClick={handleConnectEvent}
              disabled={connection?.status === 'COMING_SOON'}
            >
              {connection?.status === 'COMING_SOON' ? 'Coming soon' : 'Connect'}
            </ButtonRounded>
          </Box>
        </BlockWrap>
      </FlexContainer>
      {renderConnectionForm()}
    </ConnectionTile>
  );
};

DirectoryConnectionsItem.propTypes = {
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
  refetch: func.isRequired,
};

export default DirectoryConnectionsItem;
