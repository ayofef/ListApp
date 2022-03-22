import React from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

const skeletonArray = Array.from(Array(3).keys());

const SkeletonLoader = () => (
  <Box display="flex" flexDirection="column">
    {skeletonArray.map((key) => (
      <Box key={key} borderRadius="8px" overflow="hidden" marginBottom="6px">
        <Skeleton variant="rect" height={40} width="100%" animation="wave" />
      </Box>
    ))}
  </Box>
);
export default SkeletonLoader;
