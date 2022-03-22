import React from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

import THEME from '../../../../../../../constants/theme';
import { BORDER_COLOR } from '../../../../../constant';
import { StyledLoadingFeaturedItem } from './styled';

const generateArr = (n) => Array.from(Array(n).keys());

const Heading = () => (
  <Box width="170px" height="30px" overflow="hidden" borderRadius="6px" mb="22px">
    <Skeleton variant="rect" height={50} width={400} animation="wave" />
  </Box>
);

const FeaturedItem = () => (
  <StyledLoadingFeaturedItem
    height="180px"
    bgcolor={THEME.primaryColors.primaryLight}
    boxSizing="border-box"
    p="24px"
    borderRadius="8px"
    width="330px"
    display="flex"
    flexDirection="column"
  >
    <Box mb="auto" flexShrink={0} borderRadius="50%" overflow="hidden" width="56px" height="56px">
      <Skeleton variant="rect" height={70} width={70} animation="wave" />
    </Box>

    <Box mt="48px" display="flex" alignItems="flex-end" justifyContent="space-between">
      <Box width="140px" height="30px" overflow="hidden" borderRadius="6px" mb="22px">
        <Skeleton variant="rect" height={50} width={200} animation="wave" />
      </Box>

      <Box width="80px" height="30px" overflow="hidden" borderRadius="6px" mb="22px">
        <Skeleton variant="rect" height={50} width={100} animation="wave" />
      </Box>
    </Box>
  </StyledLoadingFeaturedItem>
);

const ConnectionItem = () => (
  <Box
    height="72px"
    bgcolor="#fff"
    boxSizing="border-box"
    p="16px"
    borderRadius="8px"
    width="330px"
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    border={`0.5px solid ${BORDER_COLOR}`}
    mb="16px"
  >
    <Box display="flex" alignItems="center">
      <Box borderRadius="50%" overflow="hidden" width="40px" height="40px" mr="16px">
        <Skeleton variant="rect" height={70} width={70} animation="wave" />
      </Box>
      <Box width="140px" height="30px" overflow="hidden" borderRadius="6px">
        <Skeleton variant="rect" height={50} width={200} animation="wave" />
      </Box>
    </Box>
    <Box width="70px" height="30px" overflow="hidden" borderRadius="6px">
      <Skeleton variant="rect" height={50} width={200} animation="wave" />
    </Box>
  </Box>
);

const LoadingState = () => {
  return (
    <Box mt="32px">
      <Box>
        <Heading />
        <Box display="flex" mt="20px" justifyContent="space-between">
          {generateArr(3)?.map((key) => {
            return <FeaturedItem key={key} />;
          })}
        </Box>
      </Box>
      <Box mt="40px">
        <Heading />

        <Box display="flex" mt="20px" justifyContent="space-between" flexWrap="wrap">
          {generateArr(9)?.map((key) => {
            return <ConnectionItem key={key} />;
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default LoadingState;

export { ConnectionItem };
