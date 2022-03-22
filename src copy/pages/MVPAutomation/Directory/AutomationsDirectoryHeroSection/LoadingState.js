import React from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

import {
  StyledFeaturedWrapper,
  StyledFeaturedItemWrapper,
  StyledFeaturedItemLeft,
  StyledFeaturedItemRight,
} from './styled';

const skeletonArray = Array.from(Array(2).keys());

const LoadingState = () => {
  return (
    <Box>
      <StyledFeaturedWrapper>
        {skeletonArray.map((key) => (
          <StyledFeaturedItemWrapper key={key} as="div">
            <StyledFeaturedItemLeft>
              <Box borderRadius="4px" overflow="hidden" height="16px" mb="12px" width="80px">
                <Skeleton height="100px" width="100%" animation="wave" />
              </Box>
              <Box borderRadius="4px" overflow="hidden" width="100%" maxWidth="700px" height="28px" mb="6px">
                <Skeleton height="100px" width="100%" animation="wave" />
              </Box>
              <Box borderRadius="4px" overflow="hidden" width="50%" maxWidth="500px" height="28px" mb="6px">
                <Skeleton height="100px" width="100%" animation="wave" />
              </Box>
            </StyledFeaturedItemLeft>

            <StyledFeaturedItemRight>
              <Box borderRadius="6px" overflow="hidden" height="100%">
                <Skeleton height="800px" width="200px" animation="wave" />
              </Box>
            </StyledFeaturedItemRight>
          </StyledFeaturedItemWrapper>
        ))}
      </StyledFeaturedWrapper>
    </Box>
  );
};

export default LoadingState;
