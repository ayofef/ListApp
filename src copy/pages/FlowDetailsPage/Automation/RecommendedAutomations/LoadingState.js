import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';
import { StyledButtonCard } from './RecommendedItem/styled';

const flowArray = Array.from(Array(6).keys());
const tagArray = Array.from(Array(2).keys());

const COMMON_PROPS = {
  overflow: 'hidden',
  borderRadius: '4px',
};

const LoadingState = ({ modal }) => {
  return (
    <>
      {flowArray.map((key) => (
        <Grid key={key} item md={12} lg={6} {...(modal && { xs: 6, lg: 6, xl: 6 })}>
          <StyledButtonCard as="div" key={key}>
            <Box display="flex" width="100%" alignItems="center">
              {tagArray.map((tag) => (
                <Box key={`tags-${tag}`} width="110px" height="24px" {...COMMON_PROPS} mr="4px">
                  <Skeleton variant="rect" height="400px" width="100%" animation="wave" />
                </Box>
              ))}
            </Box>
            <Box mt="auto">
              <Box mb="8px" width="130px" height="30px" {...COMMON_PROPS}>
                <Skeleton variant="rect" height="400px" width="100%" animation="wave" />
              </Box>
              <Box height="18px" width="200px" {...COMMON_PROPS} mb="4px">
                <Skeleton variant="rect" height="400px" width="100%" animation="wave" />
              </Box>
              <Box height="18px" width="200px" {...COMMON_PROPS}>
                <Skeleton variant="rect" height="400px" width="100%" animation="wave" />
              </Box>
            </Box>
          </StyledButtonCard>
        </Grid>
      ))}
    </>
  );
};

LoadingState.propTypes = {
  modal: PropTypes.bool,
};
LoadingState.defaultProps = {
  modal: false,
};

export default LoadingState;
