import React from 'react';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

const Fallback = () => (
  <Box bgcolor="#000" pt="56.25%" position="relative">
    <Box
      color="white"
      position="absolute"
      top="0"
      left="0"
      bottom="0"
      right="0"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress />
    </Box>
  </Box>
);

export default Fallback;
