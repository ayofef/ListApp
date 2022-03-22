import React from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

const LoadingState = () => {
  return (
    <Box width="256px" borderRadius="8px" height="48px" overflow="hidden" m="0 24px 18px 0">
      <Skeleton width="100%" height="250px" animation="wave" />
    </Box>
  );
};

export default LoadingState;
