import React from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

const LoadingState = () => {
  return (
    <Box borderRadius="4px" overflow="hidden" height="100px" width="100px" mb="6px">
      <Skeleton height="110px" width="110px" animation="wave" />
    </Box>
  );
};

export default LoadingState;
