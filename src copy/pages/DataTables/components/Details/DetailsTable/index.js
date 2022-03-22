import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import TableBody from '@material-ui/core/TableBody/index';
import isEmpty from 'lodash/isEmpty';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import EmptyState from './EmptyState';
import { StyledTable, StyledTableRow } from '../../../../../components/table/styled';
import { P16B } from '../../../../../components/atoms';
import { StyledWrapper } from './styled';
import { StyledDivider } from '../styled';

const DetailsTable = ({ rows, cells, title, handleRowClick }) => {
  const { t } = useTranslation();

  const emptyData = useMemo(() => isEmpty(rows), [rows]);

  return (
    <StyledWrapper>
      <P16B>{t(title)}</P16B>
      <StyledDivider />
      {emptyData && (
        <Box height="200px" overflow="hidden">
          <EmptyState title={title} />
        </Box>
      )}
      {!emptyData && (
        <StyledTable size="small">
          <TableBody>
            {rows.map((row) => {
              return (
                <StyledTableRow
                  key={row?.id}
                  hover
                  $noCheckBox
                  $checkboxEditMode
                  padding="checkbox"
                  onClick={() => handleRowClick(row)}
                >
                  {cells.map(({ accessor, Cell, ...rest }) => (
                    <Cell
                      key={accessor}
                      {...rest}
                      row={{ original: row }}
                      cell={{ column: { ...rest } }}
                      padding="checkbox"
                    />
                  ))}
                </StyledTableRow>
              );
            })}
          </TableBody>
        </StyledTable>
      )}
    </StyledWrapper>
  );
};

DetailsTable.propTypes = {
  cells: PropTypes.arrayOf(
    PropTypes.shape({
      Header: PropTypes.string,
      id: PropTypes.string,
      Cell: PropTypes.func,
    })
  ).isRequired,
  rows: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  title: PropTypes.string.isRequired,
  handleRowClick: PropTypes.func.isRequired,
};

export default DetailsTable;
