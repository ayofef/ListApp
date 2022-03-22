import React from 'react';
import TableCell from '@material-ui/core/TableCell/TableCell';
import { string } from 'prop-types';
import { Tag } from '../../../components/atoms';

export const colors = {
  OPEN: {
    bg: '#F5F2FF',
    color: '#4E40EF',
  },
  REFUNDED: {
    bg: 'rgba(230, 233, 236, 0.57)',
    color: 'black',
  },

  RESOLVED: {
    bg: '#F5F6F7',
    color: '#545A61',
  },
  COMPLETED: {
    bg: 'rgba(28,206,106, 0.6)',
    color: 'black',
  },
};

const StatusCell = ({ data }) => {
  const variant = data.charAt(0) + data.slice(1).toLowerCase();

  return (
    <TableCell align="left" padding="none">
      <Tag backgroundColor={colors[data]?.bg} padding="6px 8px" color={colors[data]?.color}>
        {variant}
      </Tag>
    </TableCell>
  );
};

StatusCell.propTypes = {
  data: string.isRequired,
};

export default StatusCell;
