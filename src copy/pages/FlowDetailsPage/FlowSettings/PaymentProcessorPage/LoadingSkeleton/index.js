import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';
import BarLoadingState from '../../SettingsHomepage/LoadingState/BarLoadingState';

const createArray = (length) => Array.from({ length }, (v, k) => k);

const skeletonArray = createArray(2);

const LoadingSkeleton = () => (
  <>
    {skeletonArray.map((key) => (
      <Box mb="40px" key={key}>
        <Box width="170px" height="30px" overflow="hidden" borderRadius="6px" mb="22px">
          <Skeleton variant="rect" height={50} width={400} animation="wave" />
        </Box>

        <BarLoadingState />
      </Box>
    ))}
  </>
);

export default LoadingSkeleton;
