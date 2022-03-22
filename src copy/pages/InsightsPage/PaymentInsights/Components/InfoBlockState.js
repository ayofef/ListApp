import React from 'react';
import Box from '@material-ui/core/Box';
import withStyles from '@material-ui/core/styles/withStyles';
import { RightBlock, LeftBlock } from '../../../../assets/icons/EmptyStates/InsightInfoBlock';

const StyledBox = withStyles({
  root: {
    opacity: ({ opacity }) => 1 / opacity,
  },
})(Box);

const skeletonArray = Array.from(Array(4).keys());

const style = {
  transform: 'translate(-50%, -50%)',
};

const InfoBlockState = ({ children }) => {
  return (
    <Box position="relative">
      {skeletonArray.map((key) => (
        <StyledBox
          key={key}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          borderBottom="1px solid #E6E9EC"
          py="8px"
          opacity={key + 1.2}
        >
          <LeftBlock />
          <RightBlock />
        </StyledBox>
      ))}
      <Box position="absolute" top="50%" left="50%" style={style} bgcolor="#fff" p="12px">
        {children}
      </Box>
    </Box>
  );
};

export default InfoBlockState;
