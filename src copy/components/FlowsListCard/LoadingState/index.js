import React from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

const STAT_ARRAY = Array.from(Array(6).keys());
const STAGES_ARRAY = Array.from(Array(2).keys());

const StatsLoadingState = () => {
  return (
    <>
      {STAT_ARRAY.map((key) => (
        <Box key={key} borderRadius="4px" mr="50px" mt="16px" overflow="hidden">
          <Skeleton variant="rect" height="50px" width="120px" animation="wave" />
        </Box>
      ))}
    </>
  );
};

const StagesLoadingState = () => {
  return (
    <>
      {STAGES_ARRAY.map((key) => (
        <Box key={key} borderRadius="4px" mr="16px" overflow="hidden">
          <Skeleton variant="rect" height="100px" width="140px" animation="wave" />
        </Box>
      ))}
    </>
  );
};

export { StatsLoadingState, StagesLoadingState };
