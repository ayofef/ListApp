import React from 'react';
import Box from '@material-ui/core/Box';
import ListSkeleton from '../../../../../components/ListSkeleton';

const LoadingState = () => {
  return (
    <Box py="4px" pr="6px">
      <ListSkeleton rowNumber={3} height="32px" p="2px" />
    </Box>
  );
};

export default LoadingState;
