import React from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import { StyledRecipeWrapper } from './RecipeItem/styled';

const skeletonArray = Array.from(Array(3).keys());

const RecipeListLoadingState = () => {
  return (
    <>
      {skeletonArray.map((key) => (
        <StyledRecipeWrapper key={key}>
          <Box mb="16px">
            <Box mb="14px" display="flex" alignItems="center">
              <Box borderRadius="6px" width="20px" height="30px" overflow="hidden" mr="6px">
                <Skeleton variant="rect" height="40px" width="30px" animation="wave" />
              </Box>
              <Box borderRadius="6px" width="120px" height="26px" overflow="hidden">
                <Skeleton variant="rect" height="30px" width="125px" animation="wave" />
              </Box>
            </Box>
            <Box>
              <Box borderRadius="6px" width="245px" height="20px" overflow="hidden" mb="4px">
                <Skeleton variant="rect" height="40px" width="250px" animation="wave" />
              </Box>
              <Box borderRadius="6px" width="200px" height="20px" overflow="hidden">
                <Skeleton variant="rect" height="40px" width="250px" animation="wave" />
              </Box>
            </Box>
          </Box>

          <Box borderRadius="6px" width="108px" height="32px" overflow="hidden">
            <Skeleton variant="rect" height="40px" width="110px" animation="wave" />
          </Box>
        </StyledRecipeWrapper>
      ))}
    </>
  );
};

export default RecipeListLoadingState;
