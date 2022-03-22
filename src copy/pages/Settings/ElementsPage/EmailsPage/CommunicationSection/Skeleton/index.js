import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';
import { v4 as uniqueId } from 'uuid';

const createArray = (length) => Array.from({ length }, (v, k) => k);

const skeletonArray = createArray(12);

const CommunicationSkeleton = () => (
  <Box display="flex" flexWrap="nowrap" p="32px 0">
    <Box flexBasis="350px" marginRight="150px">
      <Skeleton variant="rect" height={450} width="100%" animation="wave" />
    </Box>
    <Box display="flex" flexWrap="wrap" width="100%" height="auto">
      {skeletonArray.map(() => (
        <Box
          flexBasis="240px"
          marginBottom="32px"
          marginRight="20px"
          borderRadius="8px"
          overflow="hidden"
          height="min-content"
          key={uniqueId()}
        >
          <Skeleton variant="rect" height={280} width="100%" animation="wave" />
        </Box>
      ))}
    </Box>
  </Box>
);

export default CommunicationSkeleton;
