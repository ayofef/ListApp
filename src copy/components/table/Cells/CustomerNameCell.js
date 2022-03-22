import PropTypes from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';
import capitalize from '@material-ui/core/utils/capitalize';
import { StyledTableCell } from './styled';
import { PROPTYPES } from './constant';
import CircleImage from '../CircleImage';
import { P14B, P12 } from '../../atoms';

const Customer = ({ name, email }) => {
  return (
    <Box display="flex" alignItems="center">
      <Box display="flex" mr="16px">
        <CircleImage bgColor="#E6E9EC" color="#232629" text={name} textOnly size={24} fontSize="10px" />
      </Box>
      <Box>
        <P14B>{capitalize(name)}</P14B>
        <P12 color="#787F88">{email}</P12>
      </Box>
    </Box>
  );
};

Customer.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const CustomerNameCell = ({ row: { original }, cell: { column } }) => {
  const header = column?.Header;
  const { name, email } = original[header];
  return (
    <StyledTableCell column={column} id={original?.id}>
      <Customer name={name} email={email} />
    </StyledTableCell>
  );
};

CustomerNameCell.propTypes = PROPTYPES;
export default CustomerNameCell;
export { Customer };
