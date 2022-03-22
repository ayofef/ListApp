import React from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

const skeletonArray = Array.from(Array(3).keys());

const ListLoadingState = () => {
  return (
    <Box>
      {skeletonArray.map((key) => (
        <Box key={key} borderRadius="6px" overflow="hidden" height="46px" mb="6px">
          <Skeleton height="100px" width="500px" animation="wave" />
        </Box>
      ))}
    </Box>
  );
};

export default ListLoadingState;
