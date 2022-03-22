import React from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

const skeletonArray = Array.from(Array(3).keys());

const LoadingState = () => (
  <Box borderRadius="4px" overflow="hidden" width="100%">
    {skeletonArray.map((key) => (
      <Box key={key} display="flex" justifyContent="space-between" borderBottom="1px solid #E6E9EC" alignItems="center">
        <Box height="18px" width="140px" overflow="hidden" borderRadius="6px" margin="14px 0">
          <Skeleton variant="rect" height={40} width={200} animation="wave" />
        </Box>

        <Box height="16px" width="16px" overflow="hidden" borderRadius="50%" mr="10px">
          <Skeleton variant="rect" height={40} width={120} animation="wave" />
        </Box>
      </Box>
    ))}
  </Box>
);
export default LoadingState;
