import PropTypes, { oneOfType } from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

const LoadingState = ({ width, height, mt, loading, children }) => {
  return loading ? (
    <Box borderRadius="4px" overflow="hidden" width="100%" marginTop={mt}>
      <Skeleton variant="rect" height={height} width={width} animation="wave" />
    </Box>
  ) : (
    children ?? null
  );
};

LoadingState.propTypes = {
  width: oneOfType([PropTypes.string, PropTypes.number]),
  height: oneOfType([PropTypes.string, PropTypes.number]),
  mt: oneOfType([PropTypes.string, PropTypes.number]),
  loading: PropTypes.bool,
};

LoadingState.defaultProps = {
  width: '100%',
  height: '90px',
  mt: '24px',
  loading: false,
};

export default LoadingState;
