import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import TableCell from '@material-ui/core/TableCell';
// import BreakpointTableCell from '@material-ui/core/TableCell';
import Box from '@material-ui/core/Box';
import capitalize from '@material-ui/core/utils/capitalize';

import Processor from './Processor';
import getStatusContent from './StatusContent';
import CircleImage from './CircleImage';
import { parseInitials } from '../../utils/parseInitials';
import { BreakpointTableCell } from './styled';
import { P14M } from '../atoms';
// Settings
const PROPTYPES = {
  data: PropTypes.string.isRequired,
};

const FORMATS = {
  sameDay: 'DD MMM YYYY',
  nextDay: 'DD MMM YYYY',
  nextWeek: 'DD MMM YYYY',
  lastDay: 'DD MMM YYYY',
  lastWeek: 'DD MMM YYYY',
  sameElse: 'DD MMM YYYY',
};

const MAX = 5;
// Components
const AmountCell = ({ labelId, data }) => (
  <TableCell id={labelId ?? data} component="th" scope="row" align="left">
    <Box component="span" fontWeight={600} color="#232629">
      {data}
    </Box>
  </TableCell>
);
const TextCell = ({ data }) => <TableCell align="left">{data}</TableCell>;
const TextCellMedium = ({ data }) => (
  <TableCell align="left">
    <P14M color="#232629">{data}</P14M>
  </TableCell>
);
const TextCapitalizeCell = ({ data }) => <TableCell align="left">{capitalize(data.toLowerCase())}</TableCell>;
const TextUppercaseCell = ({ data }) => <TableCell align="left">{data.toUpperCase()}</TableCell>;
const DateCell = ({ data }) => <TableCell align="left">{data ? moment(data).calendar(FORMATS) : ''}</TableCell>;
const ProcessorCell = ({ breakpoint, data: { name, logo } }) => (
  <BreakpointTableCell align="center" breakpoint={breakpoint}>
    <Processor name={name} logo={logo} />
  </BreakpointTableCell>
);
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

const StatusCell = ({ data }) => {
  const Content = getStatusContent(data);

  return <TableCell align="left">{Content && <Content data={data} />}</TableCell>;
};

AmountCell.propTypes = {
  ...PROPTYPES,
  labelId: PropTypes.string,
};
AmountCell.defaultProps = {
  labelId: '',
};
TextCell.propTypes = PROPTYPES;
TextCellMedium.propTypes = PROPTYPES;
TextCapitalizeCell.propTypes = PROPTYPES;
TextUppercaseCell.propTypes = PROPTYPES;
DateCell.propTypes = PROPTYPES;
StatusCell.propTypes = {
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]).isRequired,
};
ProcessorCell.propTypes = {
  breakpoint: PropTypes.string,
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
  }).isRequired,
};
ProcessorCell.defaultProps = {
  breakpoint: '',
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

export {
  AmountCell,
  TextCell,
  TextCellMedium,
  TextCapitalizeCell,
  TextUppercaseCell,
  ProcessorCell,
  DateCell,
  StatusCell,
  MultiProcessorCell,
};
