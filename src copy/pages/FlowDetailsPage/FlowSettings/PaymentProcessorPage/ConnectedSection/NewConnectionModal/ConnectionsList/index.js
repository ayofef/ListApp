import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import Box from '@material-ui/core/Box';
import isEmpty from 'lodash/isEmpty';
import differenceBy from 'lodash/differenceBy';
import FeaturedSection from './FeaturedSection';
import AvailableSection from './AvailableSection';
import useSearch from '../../../../../../../hooks/useSearch';
import SearchSection from './SearchSection';

const ConnectionsList = ({ connections }) => {
  const [searchParams] = useSearch();

  const featuredConnections = useMemo(() => {
    const initialFilter = connections?.filter((el) => el?.featured);
    const isFilteredEmpty = isEmpty(initialFilter);

    if (isFilteredEmpty) {
      return connections?.filter((connection) => !isEmpty(connection))?.slice(0, 3);
    }

    if (!isFilteredEmpty && initialFilter?.length < 3) {
      const removeTheFilteredItem = differenceBy(connections, initialFilter);
      return [...initialFilter, removeTheFilteredItem[0]];
    }

    return initialFilter?.slice(0, 3);
  }, [connections]);

  const availableConnections = useMemo(() => connections.filter((el) => !featuredConnections.includes(el)), [
    connections,
    featuredConnections,
  ]);

  return (
    <Box mt="32px">
      {searchParams?.search ? (
        <SearchSection availableConnections={connections} />
      ) : (
        <>
          <FeaturedSection featuredConnections={featuredConnections} />
          <AvailableSection availableConnections={availableConnections} />
        </>
      )}
    </Box>
  );
};

ConnectionsList.propTypes = {
  connections: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      company: PropTypes.shape({
        name: PropTypes.string,
        logo: PropTypes.string,
      }),
    })
  ).isRequired,
};

export default ConnectionsList;
