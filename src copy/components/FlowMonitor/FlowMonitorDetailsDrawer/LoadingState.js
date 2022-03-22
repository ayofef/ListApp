import React from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import { StyledRow } from '../styled';

const flowArray = Array.from(Array(10).keys());

const LoadingState = () => {
  return (
    <>
      {flowArray.map((key) => (
        <StyledRow key={key} disabled>
          <Box height="64px" width="30%" display="flex" alignItems="center">
            <Box height="30px" width="100%" borderRadius="6px" overflow="hidden">
              <Skeleton variant="rect" height="73px" width="100%" animation="wave" />
            </Box>
          </Box>
          <Box height="64px" width="20%" display="flex" alignItems="center" justifyContent="flex-start">
            <Box height="30px" width="100%" borderRadius="6px" overflow="hidden">
              <Skeleton variant="rect" height="73px" width="100%" animation="wave" />
            </Box>
          </Box>
          <Box height="64px" width="20%" display="flex" alignItems="center" justifyContent="flex-start">
            <Box height="30px" width="100%" borderRadius="6px" overflow="hidden">
              <Skeleton variant="rect" height="73px" width="100%" animation="wave" />
            </Box>
          </Box>
          <Box height="64px" width="30%" display="flex" alignItems="center" justifyContent="flex-start">
            <Box height="30px" width="100%" borderRadius="6px" overflow="hidden">
              <Skeleton variant="rect" height="73px" width="100%" animation="wave" />
            </Box>
          </Box>
          <Box height="64px" width="5%" display="flex" alignItems="center" justifyContent="flex-start">
            <Box height="30px" width="100%" borderRadius="6px" overflow="hidden">
              <Skeleton variant="rect" height="73px" width="100%" animation="wave" />
            </Box>
          </Box>
        </StyledRow>
      ))}
    </>
  );
};

export default LoadingState;
