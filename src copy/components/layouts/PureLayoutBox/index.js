import React from 'react';
import { string, node } from 'prop-types';

import { Box, BoxWrapper } from './styled';

const PureLayoutBox = ({ children, theme }) => {
  return (
    <BoxWrapper>
      <Box theme={theme} alignSelf="center">
        {children}
      </Box>
    </BoxWrapper>
  );
};

PureLayoutBox.propTypes = {
  theme: string,
  children: node.isRequired,
};

PureLayoutBox.defaultProps = {
  theme: 'light',
};

export default PureLayoutBox;
