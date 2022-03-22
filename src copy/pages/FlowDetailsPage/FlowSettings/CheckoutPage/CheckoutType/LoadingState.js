import React from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

const skeletonArray = Array.from(Array(5).keys());

const LoadingState = () => (
  <>
    {skeletonArray.map((key) => (
      <Box key={key} display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center">
        <Box display="flex" alignItems="center" width="100%">
          <Box borderRadius="8px" overflow="hidden" width="300px" height="32px">
            <Skeleton variant="rect" height={60} width="100%" animation="wave" />
          </Box>

          <Box borderRadius="50%" overflow="hidden" width="14px" height="14px" ml="auto">
            <Skeleton variant="rect" height={60} width="100%" animation="wave" />
          </Box>
        </Box>
      </Box>
    ))}
  </>
);
export default LoadingState;
