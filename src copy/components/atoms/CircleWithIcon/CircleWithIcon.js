import React from 'react';
import { Box } from '@material-ui/core';
import { arrayOf, number, shape } from 'prop-types';
import THEME from '../../../constants/theme';

const CircleWithIcon = ({ index, array, children }) => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    borderRadius="50%"
    border={`1px solid ${THEME.greyColors.grey16}`}
    width="44px"
    height="44px"
    ml={index && '-8px'}
    zIndex={array?.length - index}
    bgcolor={THEME.primaryColors.white}
  >
    {children}
  </Box>
);

CircleWithIcon.propTypes = {
  index: number.isRequired,
  array: arrayOf(shape({})).isRequired,
};

export default CircleWithIcon;
