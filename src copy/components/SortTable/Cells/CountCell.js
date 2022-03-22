import React from 'react';
import { number, shape } from 'prop-types';
import { Box } from '@material-ui/core';
import { L12M } from '../../atoms';
import THEME from '../../../constants/theme';

const CountCell = ({ data }) => {
  const { total, withIssues } = data;

  return (
    <Box width="130px">
      {total ?? 0} runs
      {!!withIssues && <L12M color={THEME.secondaryColors.nodeError}>with {withIssues} errors</L12M>}
    </Box>
  );
};

CountCell.propTypes = {
  data: shape({
    total: number,
    withIssues: number,
  }),
};

CountCell.defaultProps = {
  data: 0,
};

export default CountCell;
