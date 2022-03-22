import React from 'react';
import Box from '@material-ui/core/Box';
import useSearch from '../../../../../../hooks/useSearch';
import ListEmptyState from '../../../../../../components/ListEmptyState';

const TITLE = 'Connections';
const DESC = 'There are currently no connections';
const SEARCH_DESC = (search) => `No search result for "${search}"`;

const EmptyState = () => {
  const [searchParams] = useSearch();

  return (
    <Box height="100%">
      <ListEmptyState title={TITLE} description={searchParams?.search ? SEARCH_DESC(searchParams?.search) : DESC} />
    </Box>
  );
};

export default EmptyState;
