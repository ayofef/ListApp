import React from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

const LoadingState = () => {
  return (
    <Box borderRadius="8px" overflow="hidden" mb="24px">
      <Skeleton variant="rect" height="42px" width="100%" animation="wave" />
    </Box>
  );
};

export default LoadingState;
