import React from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

const PageSkeleton = () => (
  <Box borderRadius="8px" overflow="hidden">
    <Skeleton variant="rect" height={40} width="120px" animation="wave" />
  </Box>
);

const buttonArray = Array.from(Array(2).keys());
const ButtonSkeleton = () => (
  <>
    {buttonArray.map((key) => (
      <Box key={key} borderRadius="8px" overflow="hidden" marginLeft="16px">
        <Skeleton variant="rect" height={40} width="40px" animation="wave" />
      </Box>
    ))}
  </>
);
export { PageSkeleton, ButtonSkeleton };
