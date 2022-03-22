import PropTypes from 'prop-types';
import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';
import { StyledBarSections } from '../../components/StyledInPageSection/styled';

const BarLoadingState = ({ checkout }) => {
  return (
    <StyledBarSections>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          {!checkout && (
            <Box width="47px" height="47px" overflow="hidden" borderRadius="50%" mr="8px">
              <Skeleton variant="rect" height={50} width={50} animation="wave" />
            </Box>
          )}

          <Box width={checkout ? '220px' : '90px'} height="30px" overflow="hidden" borderRadius="6px">
            <Skeleton variant="rect" height={50} width={300} animation="wave" />
          </Box>
        </Box>
        <Box width={checkout ? '100px' : '60px'} height="30px" overflow="hidden" borderRadius="6px">
          <Skeleton variant="rect" height={50} width={200} animation="wave" />
        </Box>
      </Box>
    </StyledBarSections>
  );
};

BarLoadingState.propTypes = {
  checkout: PropTypes.bool,
};
BarLoadingState.defaultProps = {
  checkout: false,
};

export default BarLoadingState;
