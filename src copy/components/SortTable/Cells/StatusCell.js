import React from 'react';
import { shape, string } from 'prop-types';
import { Box } from '@material-ui/core';
import { L12M } from '../../atoms';
import THEME from '../../../constants/theme';

const StatusCell = ({ data }) => {
  const { title, color } = data?.status;
  return (
    <Box width="260px" color={color} align="left">
      {title}
      {data?.hasDraft && <L12M color={THEME.greyColors.grey15}>with unpublished changes</L12M>}
    </Box>
  );
};

StatusCell.propTypes = {
  data: shape({
    title: string,
    color: string,
  }),
};

StatusCell.defaultProps = {
  data: {
    title: '',
    color: '#000',
  },
};

export default StatusCell;
