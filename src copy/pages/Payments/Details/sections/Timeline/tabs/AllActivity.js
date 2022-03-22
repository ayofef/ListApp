import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

import Overview from './Overview';

const AllActivity = ({ value }) => (
  <Box display="flex">
    <Box width=".5">
      <Overview value={value} />
    </Box>

    <Box width=".5">{value[0]?.message}</Box>
  </Box>
);

AllActivity.propTypes = {
  value: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      time: PropTypes.string.isRequired,
      message: PropTypes.string,
    })
  ).isRequired,
};

export default AllActivity;
