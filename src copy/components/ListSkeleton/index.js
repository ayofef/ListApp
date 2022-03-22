import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import range from 'lodash/range';
import clamp from 'lodash/clamp';

const MAX = 20;
const createRows = (n) => range(clamp(n, 1, MAX));

const ListSkeleton = ({ rowNumber, p, height }) =>
  createRows(rowNumber).map((i) => (
    <Box key={i} p={p}>
      <Skeleton animation="wave" height={height} />
    </Box>
  ));

ListSkeleton.propTypes = {
  p: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  rowNumber: PropTypes.number,
};

ListSkeleton.defaultProps = {
  p: 1,
  height: 24,
  rowNumber: MAX,
};

export default ListSkeleton;
