import React from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import { ListItem } from './styled';

const skeletonArray = Array.from(Array(5).keys());

const LoadingState = () => {
  return (
    <Box mt="14px">
      {skeletonArray.map((key) => (
        <ListItem key={key} disabled>
          <Box overflow="hidden" display="flex" alignItems="center" justifyContent="flex-start" mb="16px">
            <Box width="220px" height="20px" borderRadius="6px" overflow="hidden" mr="32px">
              <Skeleton variant="rect" height="73px" width="100%" animation="wave" />
            </Box>
            <Box width="16px" height="14px" borderRadius="8px" overflow="hidden">
              <Skeleton variant="rect" height="73px" width="100%" animation="wave" />
            </Box>
          </Box>
        </ListItem>
      ))}
    </Box>
  );
};

export default LoadingState;
