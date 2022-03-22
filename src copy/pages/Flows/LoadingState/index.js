import React from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

const flowArray = Array.from(Array(2).keys());

const LoadingState = () => {
  return (
    <>
      {flowArray.map((key) => (
        <Box key={key} borderRadius="8px" overflow="hidden" mb="24px">
          <Skeleton variant="rect" height="281px" width="100%" animation="wave" />
        </Box>
      ))}
    </>
  );
};

export default LoadingState;
