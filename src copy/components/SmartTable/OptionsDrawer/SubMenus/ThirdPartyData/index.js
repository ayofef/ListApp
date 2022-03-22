import React from 'react';
import Box from '@material-ui/core/Box';
import ListEmptyState from '../../../../ListEmptyState';

const TITLE = 'Coming soon..';
const DESC = 'You would be able to add third party data into your payment feed e.g CRM data.';

const index = () => {
  return (
    <Box width="100%">
      <ListEmptyState title={TITLE} description={DESC} minWidth="296px" />
    </Box>
  );
};

export default index;
