import React from 'react';
import Box from '@material-ui/core/Box';
import useSearch from '../../../hooks/useSearch';
import ListEmptyState from '../../../components/ListEmptyState';

const TITLE = 'You currently have no payment issues.';
const DESCRIPTION = 'Create a payment issue from your payment feed.';

const SEARCH_TITLE = 'No results found.';
const SEARCH_DESCRIPTION = 'Clear search or filter and try again.';

const EmptyState = () => {
  const [{ search, filter }] = useSearch();

  return (
    <Box height="calc(100vh - 800px)">
      <ListEmptyState
        position="absolute"
        title={search || filter ? SEARCH_TITLE : TITLE}
        description={search || filter ? SEARCH_DESCRIPTION : DESCRIPTION}
      />
    </Box>
  );
};

export default EmptyState;
