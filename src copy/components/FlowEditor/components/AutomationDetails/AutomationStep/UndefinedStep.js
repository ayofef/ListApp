import React from 'react';
import Box from '@material-ui/core/Box';
import LoadingState from '../LoadingState';

const UndefinedStep = () => {
  return (
    <Box component="p" bgcolor="error.main" color="error.contrastText" p="8px" borderRadius="4px">
      <LoadingState />
    </Box>
  );
};

export default UndefinedStep;
