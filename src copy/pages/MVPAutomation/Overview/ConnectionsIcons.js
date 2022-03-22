import React from 'react';
import { Box } from '@material-ui/core';
import { arrayOf, shape } from 'prop-types';
import { L10BU } from '../../../components/atoms/Typography/L10BU';
import CircleImage from '../../../components/table/CircleImage';
import THEME from '../../../constants/theme';

const ConnectionsIcons = ({ connections }) => {
  const slicedConnections = connections.slice(0, 3);

  return (
    <Box display="flex">
      {slicedConnections.map((connection, index) =>
        index === 2 && connections?.length > slicedConnections?.length ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="50%"
            width={32}
            height={32}
            bgcolor={THEME.greyColors.grey5}
            mt="2px"
            key={connection.id}
          >
            <L10BU>+{connections.length - slicedConnections.length + 1}</L10BU>
          </Box>
        ) : (
          <Box key={connection.id} mr={index < 2 ? '-6px' : '0'} zIndex={slicedConnections.length - index}>
            <CircleImage text={connection?.name} border="2px solid white" size={36} logo={connection?.company?.logo} />
          </Box>
        )
      )}
    </Box>
  );
};

ConnectionsIcons.propTypes = {
  connections: arrayOf(shape({})),
};

ConnectionsIcons.defaultProps = {
  connections: [],
};

export default ConnectionsIcons;
