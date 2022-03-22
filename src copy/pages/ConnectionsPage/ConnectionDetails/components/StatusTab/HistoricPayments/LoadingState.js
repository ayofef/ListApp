import React from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

const LoadingState = () => (
  <Box display="flex" justifyContent="space-between" alignItems="center" padding="12px 0" width="100%">
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box height="14px" width="120px" overflow="hidden" borderRadius="4px">
        <Skeleton variant="rect" height={40} width={130} animation="wave" />
      </Box>
      <Box height="14px" width="20px" overflow="hidden" borderRadius="4px" ml="6px">
        <Skeleton variant="rect" height={40} width={130} animation="wave" />
      </Box>
    </Box>
    <Box height="14px" width="120px" overflow="hidden" borderRadius="4px" ml="auto">
      <Skeleton variant="rect" height={40} width={130} animation="wave" />
    </Box>
  </Box>
);
export default LoadingState;
