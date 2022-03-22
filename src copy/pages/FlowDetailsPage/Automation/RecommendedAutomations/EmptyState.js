import PropTypes from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';
import { SIDEBAR_WIDTH } from '../../constant';
import ListEmptyState from '../../../../components/ListEmptyState';

const TITLE = 'Recommendations';
const DESC = 'There are currently no recommendations.';

const EmptyState = ({ title, desc }) => {
  return (
    <Box position="relative" width={`calc(100% - ${SIDEBAR_WIDTH})`} margin="0 auto" height="260px">
      <ListEmptyState title={title} description={desc} position="relative" />
    </Box>
  );
};

EmptyState.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
};
EmptyState.defaultProps = {
  title: TITLE,
  desc: DESC,
};

export default EmptyState;
