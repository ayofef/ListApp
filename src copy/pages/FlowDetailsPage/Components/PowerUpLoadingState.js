import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

const PowerUpLoadingState = ({ num }) => {
  const flowArray = useMemo(() => Array.from(Array(num).keys()), [num]);

  return (
    <Box display="flex" width="100%" flexWrap="wrap">
      {flowArray.map((key) => (
        <Box key={key} borderRadius="8px" width="300px" overflow="hidden" mb="16px" mr="20px">
          <Skeleton variant="rect" height="250px" width="300px" animation="wave" />
        </Box>
      ))}
    </Box>
  );
};

PowerUpLoadingState.propTypes = {
  num: PropTypes.number.isRequired,
};

export default PowerUpLoadingState;
