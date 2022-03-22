import PropTypes from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';
import useSearch from '../../../hooks/useSearch';
import ListEmptyStateWithClearSearch from '../../ListEmptyStateWithClearSearch';
import { isDefined } from '../../../utils/helpers';

const TITLE = `You currently have no data`;

const SEARCH_TITLE = ' No results found';

const EmptyState = ({ searchSelectRef }) => {
  const [{ search, filter }, setSearchParams] = useSearch();
  const showClearButton = isDefined(search) || isDefined(filter);

  return (
    <Box height="calc(100vh - 800px)">
      <ListEmptyStateWithClearSearch
        position="absolute"
        title={search || filter ? SEARCH_TITLE : TITLE}
        clearText="Clear search"
        setSearchParams={setSearchParams}
        searchSelectRef={searchSelectRef}
        showClearButton={showClearButton}
      />
    </Box>
  );
};

EmptyState.propTypes = {
  searchSelectRef: PropTypes.shape({}),
};
EmptyState.defaultProps = {
  searchSelectRef: {},
};

export default EmptyState;
