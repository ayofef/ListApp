import React from 'react';
import { string } from 'prop-types';
import TableCell from '@material-ui/core/TableCell';

const TextCell = ({ data }) => <TableCell align="left">{data}</TableCell>;

TextCell.propTypes = {
  data: string,
};

TextCell.defaultProps = {
  data: '',
};

export default TextCell;
