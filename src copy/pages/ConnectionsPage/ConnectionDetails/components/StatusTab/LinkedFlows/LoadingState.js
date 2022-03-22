import React from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import THEME from '../../../../../../constants/theme';

const LoadingState = () => (
  <Box borderRadius="4px" overflow="hidden" width="100%">
    <Box
      display="flex"
      justifyContent="space-between"
      borderBottom="1px solid #E6E9EC"
      alignItems="center"
      bgcolor={THEME.primaryColors.primaryLight}
      borderRadius="8px"
      padding="24px"
      height="84px"
    >
      <Box>
        <Box height="16px" width="140px" overflow="hidden" borderRadius="4px">
          <Skeleton variant="rect" height={40} width={300} animation="wave" />
        </Box>
        <Box height="14px" width="220px" overflow="hidden" borderRadius="4px" margin="4px 0 0 0">
          <Skeleton variant="rect" height={40} width={250} animation="wave" />
        </Box>
      </Box>

      <Box height="16px" width="16px" overflow="hidden" borderRadius="4px" mr="10px">
        <Skeleton variant="rect" height={40} width={120} animation="wave" />
      </Box>
    </Box>
  </Box>
);
export default LoadingState;
