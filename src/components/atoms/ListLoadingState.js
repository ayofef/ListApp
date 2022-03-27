import PropTypes from 'prop-types';
import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';

const generateSkeletonArr = (n) => Array.from(Array(n).keys());

function ListLoadingState({ count }) {
  const skeletonArray = generateSkeletonArr(count);
  return (
    <Box>
      {skeletonArray.map((key) => (
        <Box
          key={key}
          borderRadius="6px"
          overflow="hidden"
          mb="0px"
          height="46px"
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Skeleton height="50px" width="600px" animation="wave" />
        </Box>
      ))}
    </Box>
  );
}

ListLoadingState.propTypes = {
  count: PropTypes.number,
};
ListLoadingState.defaultProps = {
  count: 3,
};

export default ListLoadingState;
