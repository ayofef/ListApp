import React from 'react';
import Box from '@material-ui/core/Box';
import ListEmptyState from '../../../../../../../../components/ListEmptyState';

const TITLE = 'Connections';
const DESC = 'There are currently no available connections';

const EmptyState = () => {
  return (
    <Box height="200px" width="100%">
      <ListEmptyState title={TITLE} description={DESC} position="relative" />
    </Box>
  );
};

export default EmptyState;
