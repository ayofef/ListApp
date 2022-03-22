import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import isEmpty from 'lodash/isEmpty';
import ConnectionSection from './index';
import ArchiveIcon from '../../../../assets/icons/Archive';
import { StyledButton } from './styled';

const ArchiveConnections = ({ connections, connectedConnection }) => {
  const { t } = useTranslation();
  const [showDisconnected, setShowDisconnected] = useState(false);
  const toggleDisconnected = useCallback(() => setShowDisconnected((prevState) => !prevState), []);

  //open by default if live connection section is empty
  useEffect(() => {
    if (isEmpty(connectedConnection)) {
      setShowDisconnected(true);
    }
  }, [connectedConnection]);

  if (connections?.length < 1) {
    return null;
  }

  return (
    <Box borderTop="1px solid #e6e9ec" width="100%" paddingTop="24px">
      {showDisconnected && <ConnectionSection connections={connections} title="Disconnected" />}

      <StyledButton onClick={toggleDisconnected}>
        <ArchiveIcon />
        <p>{t(showDisconnected ? 'Hide disconnected' : 'Show disconnected')}</p>
      </StyledButton>
    </Box>
  );
};
ArchiveConnections.propTypes = {
  connections: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  connectedConnection: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
export default ArchiveConnections;
