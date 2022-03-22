import React from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

const Styled = {
  transform: 'translate(-50%, -50%)',
};

const ConnectSkeleton = () => (
  <Box
    style={Styled}
    borderRadius="24px"
    overflow="hidden"
    width="500px"
    height="716px"
    position="absolute"
    top="50%"
    left="50%"
    translate="yes"
  >
    <Skeleton variant="rect" animation="wave" height="100%" width="100%" />
  </Box>
);
export default ConnectSkeleton;
