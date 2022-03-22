import React from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

const COMMON_PROPS = {
  borderRadius: '8px',
  overflow: 'hidden',
};

const LoadingState = () => {
  return (
    <Box width="100%" display="flex" justifyContent="space-between" alignItems="center" mt="6px">
      <Box display="flex">
        <Box {...COMMON_PROPS} width="40px" height="40px" borderRadius="50%" mr="16px">
          <Skeleton variant="rect" height={100} width="100px" animation="wave" />
        </Box>
        <Box {...COMMON_PROPS}>
          <Skeleton variant="rect" height={40} width="200px" animation="wave" />
        </Box>
      </Box>
      <Box {...COMMON_PROPS} height="30px">
        <Skeleton variant="rect" height={40} width="80px" animation="wave" />
      </Box>
    </Box>
  );
};

export default LoadingState;
