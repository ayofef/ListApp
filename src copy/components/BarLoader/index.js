import PropTypes from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';
import { v4 as UniqueId } from 'uuid';
import { StyledLoadingBar } from './styled';

const LoadingBar = ({ barHeight, rowNumber }) => {
  const array = Array.from(Array(rowNumber).keys());
  return (
    <Box>
      {array.map((el) => (
        <StyledLoadingBar key={UniqueId()} animationDelay={`${el}s`} animationDuration={`${0.9}s`} height={barHeight} />
      ))}
    </Box>
  );
};

LoadingBar.propTypes = {
  barHeight: PropTypes.string,
  rowNumber: PropTypes.number,
};
LoadingBar.defaultProps = {
  barHeight: '6px',
  rowNumber: 7,
};

export default LoadingBar;
