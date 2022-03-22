import React from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import { StyledSection, TitleContainer, MainContainer } from './styled';

const LoadingState = () => {
  return (
    <>
      <StyledSection borderRadius="4px" overflow="hidden" mb="1px" width="80px">
        <TitleContainer>
          <Skeleton height="20px" width="100px" animation="wave" />
        </TitleContainer>

        <MainContainer>
          <Box width="80px" height="80px" borderRadius="50%" overflow="hidden">
            <Skeleton height="80px" width="80px" animation="wave" />
          </Box>
        </MainContainer>
      </StyledSection>

      <StyledSection borderRadius="4px" overflow="hidden" mb="1px" width="80px">
        <TitleContainer>
          <Skeleton height="20px" width="100px" animation="wave" />
        </TitleContainer>

        <MainContainer>
          <Skeleton height="40px" width="512px" animation="wave" />
        </MainContainer>
      </StyledSection>

      <StyledSection borderRadius="4px" overflow="hidden" mb="1px" width="80px">
        <TitleContainer>
          <Skeleton height="20px" width="100px" animation="wave" />
        </TitleContainer>

        <MainContainer>
          <Box mb="8px">
            <Skeleton height="40px" width="512px" animation="wave" />
          </Box>
          <Box mb="8px">
            <Skeleton height="40px" width="160px" animation="wave" />
          </Box>
        </MainContainer>
      </StyledSection>

      <StyledSection borderRadius="4px" overflow="hidden" mb="1px" width="80px">
        <TitleContainer>
          <Skeleton height="20px" width="100px" animation="wave" />
        </TitleContainer>

        <MainContainer>
          <Box mb="8px">
            <Skeleton height="40px" width="512px" animation="wave" />
          </Box>
          <Box mb="8px">
            <Skeleton height="40px" width="512px" animation="wave" />
          </Box>
          <Box mb="8px">
            <Skeleton height="40px" width="160px" animation="wave" />
          </Box>
        </MainContainer>
      </StyledSection>

      <StyledSection borderRadius="4px" overflow="hidden" mb="1px" width="80px">
        <TitleContainer>
          <Skeleton height="20px" width="100px" animation="wave" />
        </TitleContainer>

        <MainContainer>
          <Box mb="8px">
            <Skeleton height="80px" width="512px" animation="wave" />
          </Box>

          <Box mb="8px">
            <Skeleton height="80px" width="512px" animation="wave" />
          </Box>
        </MainContainer>
      </StyledSection>
    </>
  );
};

export default LoadingState;
