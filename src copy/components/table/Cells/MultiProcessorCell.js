import React from 'react';
import Box from '@material-ui/core/Box';
import TableCell from '@material-ui/core/TableCell';
import PropTypes from 'prop-types';
import CircleImage from '../CircleImage';
import { MAX } from './constant';
import { parseInitials } from '../../../utils/parseInitials';

const MultiProcessorCell = ({ data }) => {
  const rest = data?.length - MAX;

  return (
    <TableCell align="center">
      <Box display="flex" alignItems="center" m="-2px" flexWrap="nowrap">
        {data?.slice(0, MAX)?.map((item) => (
          <Box key={item.id} display="flex" m="2px">
            <CircleImage text={parseInitials(item.name).toUpperCase()} logo={item.logo} size={24} />
          </Box>
        ))}
        {rest > 0 && (
          <Box component="span" m="2px">
            {`+ ${rest}`}
          </Box>
        )}
      </Box>
    </TableCell>
  );
};

MultiProcessorCell.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      logo: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MultiProcessorCell;
