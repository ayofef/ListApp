import React from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import { ListItem } from './styled';

const skeletonArray = Array.from(Array(3).keys());

const LoadingState = () => {
  return (
    <>
      {skeletonArray.map((key) => (
        <ListItem key={key} disabled>
          <Box overflow="hidden" display="flex" alignItems="center" justifyContent="flex-start" ml="24px" mb="4px">
            <Box width="220px" height="30px" borderRadius="6px" overflow="hidden" mr="32px">
              <Skeleton variant="rect" height="73px" width="100%" animation="wave" />
            </Box>
            <Box width="16px" height="16px" borderRadius="8px" overflow="hidden" mr="16px">
              <Skeleton variant="rect" height="73px" width="100%" animation="wave" />
            </Box>
          </Box>
        </ListItem>
      ))}
    </>
  );
};

export default LoadingState;
