import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';
import { v4 as uniqueId } from 'uuid';

const createArray = (length) => Array.from({ length }, (v, k) => k);

const skeletonArray = createArray(5);

const BrandCenterSkeleton = () => (
  <>
    {skeletonArray.map(() => (
      <Box display="flex" flexWrap="nowrap" p="32px 0" key={uniqueId()}>
        <Box flexBasis="300px" mr="140px">
          <Box flexBasis="250px" marginBottom="16px">
            <Skeleton variant="rect" height={40} width="100%" animation="wave" />
          </Box>
          <Skeleton variant="rect" height={110} width="100%" animation="wave" />
        </Box>
        <Box flexBasis="800px">
          <Skeleton variant="rect" height={280} width="100%" animation="wave" />
        </Box>
      </Box>
    ))}
  </>
);

export default BrandCenterSkeleton;
