import React from 'react';
import capitalize from 'lodash/capitalize';
import { StyledTableCell } from './styled';
import { PROPTYPES, STATUS_UI_LABEL_MAP, transformStatusUiLabel } from './constant';
import { CircleIndicator } from '../../atoms/Indicator';

const StatusCell = ({ row: { original }, cell: { column } }) => {
  const header = column?.Header;
  const variant = original[header]?.status?.toLowerCase();
  return (
    <StyledTableCell column={column} id={original?.id}>
      <CircleIndicator variant={variant}>
        {STATUS_UI_LABEL_MAP[variant?.toUpperCase()] || capitalize(transformStatusUiLabel(variant))}
      </CircleIndicator>
    </StyledTableCell>
  );
};

StatusCell.propTypes = PROPTYPES;
export default StatusCell;
