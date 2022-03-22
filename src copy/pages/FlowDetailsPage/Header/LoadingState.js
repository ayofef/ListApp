import PropTypes from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

const LoadingState = ({ width, height }) => {
  return (
    <Box borderRadius="4px" overflow="hidden">
      <Skeleton variant="rect" height={height} width={width} animation="wave" />
    </Box>
  );
};

LoadingState.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string,
};

LoadingState.defaultProps = {
  height: '26px',
};
export default LoadingState;
