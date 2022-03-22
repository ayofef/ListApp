import React from 'react';
import PropTypes from 'prop-types';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { useTranslation } from 'react-i18next/src';
import { capitalize } from '@material-ui/core';
import TextCopy from '../../../../../../components/forms/DNSAuthenticationFrom/components/TextCopy';
import { StyledBadge, StyledText } from '../../../../../../components/atoms/Typography/StyledText';

const COLUMNS = ['type', 'name', 'value', 'status'];
const CELLS = {
  type: StyledText,
  name: TextCopy,
  value: TextCopy,
  status: StyledBadge,
};

const Resources = ({ rows, status, variant }) => {
  const { t } = useTranslation();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {COLUMNS.map((column) => (
              <TableCell key={column}>{capitalize(t(column))}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows?.map((rowData) => (
            <TableRow key={`${rowData.type}-${rowData.name}-${rowData.value}`} hover>
              {COLUMNS.map((column) => {
                const Cell = CELLS[column] ?? CELLS.type;
                const data = rowData[column] || status;

                return (
                  <TableCell key={column}>
                    <Cell {...(column === 'status' && { variant })} name={column}>
                      {data}
                    </Cell>
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

Resources.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  status: PropTypes.string,
  variant: PropTypes.string,
};

Resources.defaultProps = {
  rows: null,
  status: '',
  variant: '',
};

export default Resources;
