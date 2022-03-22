import React from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

const ConnectionFeeLoadingState = () => {
  return (
    <Box width="100%">
      <Box>
        <Box mb="6px">
          <Skeleton width={150} height={12} animation="wave" />
        </Box>
        <Skeleton width="100%" height={36} animation="wave" />
      </Box>

      <Box mt="32px">
        <Box mb="6px">
          <Skeleton width={110} height={12} animation="wave" />
        </Box>
        <Box display="flex">
          <Box mr="16px" width="100%">
            <Skeleton width="100%" height={36} animation="wave" />
          </Box>
          <Box width="100%">
            <Skeleton width="100%" height={36} animation="wave" />
          </Box>
        </Box>
      </Box>

      <Box display="flex" mt="32px">
        <Box mr="16px" width="100px">
          <Skeleton width="100%" height={40} animation="wave" />
        </Box>
        <Box width="100px">
          <Skeleton width="100%" height={40} animation="wave" />
        </Box>
      </Box>
    </Box>
  );
};

export default ConnectionFeeLoadingState;
