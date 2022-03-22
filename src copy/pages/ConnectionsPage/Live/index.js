import React, { useMemo } from 'react';
import Box from '@material-ui/core/Box';
import { useGetConnectionsLists } from '../../../hooks/connectionsHooks';
import { H3 } from '../../../components/atoms';
import { useNotificationManager } from '../../../hooks/useNotificationManager';
import ConnectionSection from './ConnectionSection';
import { StyledConnectionsWrapper } from './ConnectionSection/styled';

import ConnectionsSkeleton from './LoadingState';
import { FlexContainer } from '../../../components/atoms/flex/FlexContainer';

// Hide for MVP
// const TITLE = `You currently have no Live connections.`;
// const DESC = 'Connect one from connection directory.';

const ConnectionsPage = () => {
  const { connections, error, loading } = useGetConnectionsLists();

  useNotificationManager('error', error?.message, 5000);

  //Connected section
  const liveConnections = useMemo(() => {
    return connections?.connected?.filter((connection) => connection?.system === false) ?? [];
  }, [connections]);

  //Available section
  const availableConnections = useMemo(() => {
    return connections?.notConnected?.filter((connection) => connection?.system === false) ?? [];
  }, [connections?.notConnected]);

  //Disconnected section
  const disconnectedConnections = useMemo(() => {
    return [...(connections?.archived || []), ...(connections?.broken || [])]?.filter(
      (connection) => connection?.system === false
    );
  }, [connections]);

  //Hide for MVP
  //Empty state
  // const noData = useMemo(() => {
  //   return !loading && isEmpty(liveConnections) && isEmpty(disconnectedConnections);
  // }, [liveConnections, loading, disconnectedConnections]);

  return (
    <FlexContainer
      padding="0 0 16px"
      flexDirection="column"
      alignItems="flex-start"
      flex={1}
      width="100%"
      justifyContent="flex-start"
      backgroundColor="white"
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" mb="18px">
        <H3 fontWeight="600" textAlign="left">
          Connections
        </H3>

        {/* Hide for MVP */}
        {/* <ButtonRounded
          target="_blank"
          rel="noreferrer noopener"
          component="a"
          href={UI_ROUTES.connectionsDirectory}
          variant="contained"
          color="primary"
        >
          {t('Add connections')}
        </ButtonRounded> */}
      </Box>

      {loading && <ConnectionsSkeleton />}

      <StyledConnectionsWrapper
        flex={1}
        alignItems="flex-start"
        justifyContent="flex-start"
        width="100%"
        flexDirection="column"
        flexWrap="wrap"
      >
        <ConnectionSection connections={liveConnections} title="Connected" />

        <ConnectionSection connections={availableConnections} title="Available" />

        <ConnectionSection connections={disconnectedConnections} title="Disconnected" />
      </StyledConnectionsWrapper>
    </FlexContainer>
  );
};

export default ConnectionsPage;
