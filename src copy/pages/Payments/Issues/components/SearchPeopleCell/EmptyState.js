import PropTypes from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';
import ListEmptyState from '../../../../../components/ListEmptyState';

const TITLE = 'Assignee';
const DESC_MAP = (search) =>
  search?.length > 0
    ? `No search result for "${search}"`
    : 'You currently have no team members, Invite members to workspace and try again.';

const EmptyState = ({ search }) => {
  return (
    <Box height="300px" position="relative">
      <ListEmptyState description={DESC_MAP(search)} title={TITLE} />
    </Box>
  );
};

EmptyState.propTypes = {
  search: PropTypes.string.isRequired,
};

export default EmptyState;
