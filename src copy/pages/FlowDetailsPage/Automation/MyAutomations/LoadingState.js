import React from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import { StyledRow } from '../styled';

const flowArray = Array.from(Array(3).keys());

const LoadingState = () => {
  return (
    <>
      {flowArray.map((key) => (
        <StyledRow key={key} disabled>
          <Box overflow="hidden" display="flex" alignItems="center" justifyContent="flex-start" ml="16px">
            <Box height="86px" display="flex" alignItems="center" justifyContent="flex-start">
              <Box width="220px" height="30px" borderRadius="6px" overflow="hidden">
                <Skeleton variant="rect" height="73px" width="100%" animation="wave" />
              </Box>
            </Box>
          </Box>
          <Box width="220px" height="30px" borderRadius="6px" overflow="hidden" mr="60px">
            <Skeleton variant="rect" height="73px" width="100%" animation="wave" />
          </Box>
          <Box width="10px" height="20px" borderRadius="6px" overflow="hidden" mr="16px">
            <Skeleton variant="rect" height="73px" width="100%" animation="wave" />
          </Box>
        </StyledRow>
      ))}
    </>
  );
};

export default LoadingState;
