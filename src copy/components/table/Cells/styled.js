import { TableCell, withStyles } from '@material-ui/core';
import React from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

const StyledCell = withStyles({
  root: {
    position: 'relative',
    minWidth: ({ cellwidth }) => `${cellwidth}`,
    width: ({ cellwidth }) => `${cellwidth}`,
    maxWidth: ({ cellwidth }) => `${cellwidth}`,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: ({ bold }) => (bold ? '600' : 'normal'),
    color: ({ bold }) => (bold ? '#232629 !important' : 'inherit'),
  },
})(TableCell);

const StyledMethodIcon = withStyles({
  root: {
    '& svg': {
      height: '16px',
    },
  },
})(Box);

const StyledTableCell = ({ align, column, children, id, bold }) => {
  const width = `${column?.width ?? 150}px`;
  return (
    <StyledCell cellwidth={width} id={id} overflow="hidden" align={align} bgcolor="#fff" bold={bold ? 1 : 0}>
      {children}
    </StyledCell>
  );
};
StyledTableCell.propTypes = {
  align: PropTypes.string,
  column: PropTypes.shape({
    width: PropTypes.number,
  }),
  id: PropTypes.string.isRequired,
  bold: PropTypes.bool,
};
StyledTableCell.defaultProps = {
  align: 'left',
  column: {
    width: 150,
  },
  bold: false,
};

export { StyledTableCell, StyledMethodIcon };
