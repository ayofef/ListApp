import PropTypes from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';
import GridEmptyState from '../../../../Payments/Details/sections/GridEmptyState';

const EmptyState = ({ title }) => {
  return (
    <Box position="relative" mt="15px">
      <GridEmptyState
        mb="0"
        top="45%"
        copy={{
          title,
          desc: `There are no available ${title?.toLowerCase()}`,
        }}
      />
    </Box>
  );
};

EmptyState.propTypes = {
  title: PropTypes.string.isRequired,
};

export default EmptyState;
