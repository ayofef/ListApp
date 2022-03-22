import React, { useState, useMemo } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { TableCell } from '@material-ui/core';
import { StyledTableHead, StyledTableRow } from '../table/styled';
import { usePaymentsHandler } from './hooks';
import DragAndDropColumn from './DragAndDropColumn';
import { Checkbox } from '../atoms';
import Draggables from './Draggables';
import useTableContext from './TableContext';

const TableHead = () => {
  const { headerGroups, setColumnOrder, allColumns, rows, checkboxEditMode, tableWidth } = useTableContext();
  const { handleSelectAllClick, numSelected, rowCount } = usePaymentsHandler({
    rows,
  });
  const [dragIndex, setDragIndex] = useState({});
  const headerGroup = useMemo(() => headerGroups[0], [headerGroups]);
  /**width of the viewport divided by number of columns - paddings */
  const calculatedWidth = tableWidth / allColumns?.length - 10;
  /**we still need the minimum width to be 150px */
  const width = calculatedWidth > 150 ? calculatedWidth - 6 : 150;
  return (
    <StyledTableHead $tableWidth={`${width}px`}>
      <DragAndDropColumn setColumnOrder={setColumnOrder} flatColumns={allColumns} setDragIndex={setDragIndex}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(droppableProvided) => (
            <StyledTableRow {...headerGroup.getHeaderGroupProps()} ref={droppableProvided.innerRef}>
              {!checkboxEditMode && (
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={numSelected > 0 && numSelected < rowCount}
                    checked={rowCount > 0 && numSelected === rowCount}
                    onChange={handleSelectAllClick}
                    aria-labelledby="select all desserts"
                  />
                </TableCell>
              )}
              <Draggables headerGroup={headerGroup} dragIndex={dragIndex} />
              {droppableProvided.placeholder}
            </StyledTableRow>
          )}
        </Droppable>
      </DragAndDropColumn>
    </StyledTableHead>
  );
};

export default TableHead;
