import React from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

const FilterLoadingState = () => {
  return (
    <Box borderRadius="6px" width="150px" height="30px" overflow="hidden">
      <Skeleton variant="rect" height="40px" width="150px" animation="wave" />
    </Box>
  );
};

export default FilterLoadingState;
