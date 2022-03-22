import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import NotificationManager from 'react-notifications/lib/NotificationManager';
import { useTranslation } from 'react-i18next';
import HeadCellDropDown from './DropDownMenu';
import { Checkbox } from '../../atoms';
import { StyledHeadContent, StyledTableCell, StyledDropIndicator, StyledResizer } from './styled';
import { getItemStyle } from '../constants';
import { DnDHandle } from '../../../assets/icons';
import useTableContext from '../TableContext';

const HeadCell = ({ id, disablePadding, children, role, provided, snapshot, resizerProps, dragIndex, index }) => {
  const {
    localHiddenColumn,
    setLocalHiddenColumn,
    checkboxEditMode,
    tableState,
    disableHideColumns,
  } = useTableContext();
  const { t } = useTranslation();
  const isVisibleColumn = !localHiddenColumn?.includes(id);
  const columnWidths = tableState?.columnResizing?.columnWidths;
  const cellWidth = columnWidths[id] ?? 150;
  const dragActive = snapshot?.isDragging;
  const isSourceActive = dragActive && provided?.draggableProps?.['data-rbd-draggable-id'] === id;
  const destinationActive = index === dragIndex?.destination;
  const isGreater = dragIndex?.destination >= dragIndex?.source;

  const handleChange = (event) => {
    if (disableHideColumns) {
      NotificationManager.info(t('At least one visible column is required.'), t('Edit columns'), 5000);
      return;
    }
    const columnId = event.target.value;
    const hiddenLocally = localHiddenColumn.includes(columnId);
    /**if already hidden, remove  : add */
    if (hiddenLocally) {
      const editedColumns = localHiddenColumn.filter((column) => column !== columnId);
      setLocalHiddenColumn(editedColumns);
    } else {
      setLocalHiddenColumn((prevHiddenColumns) => [...prevHiddenColumns, columnId]);
    }
  };

  return (
    <StyledTableCell
      issourceactive={isSourceActive ? 1 : 0}
      role={role}
      align="left"
      padding={disablePadding ? 'none' : 'default'}
      currentcellwidth={`${cellWidth}px`}
      className="head-cell"
    >
      <StyledHeadContent
        {...provided?.draggableProps}
        ref={provided?.innerRef}
        style={{
          ...getItemStyle(snapshot, provided?.draggableProps?.style),
        }}
        isDragging={snapshot?.isDragging}
      >
        <div className="dragHandle" {...provided?.dragHandleProps} draggable="true">
          <DnDHandle />
        </div>
        <Box display="flex">
          {checkboxEditMode && (
            <Box mr="6px" ml="-4px">
              <Checkbox type="checkbox" onChange={handleChange} checked={isVisibleColumn} value={id} />
            </Box>
          )}
          <div className="headerControl">
            {children}

            {!checkboxEditMode && !dragActive && <HeadCellDropDown id={id} />}
          </div>
        </Box>
      </StyledHeadContent>

      {!isGreater && (
        <StyledResizer className="resizer" {...resizerProps()}>
          &nbsp;
        </StyledResizer>
      )}
      <StyledDropIndicator className="dropIndicator" destinationActive={destinationActive} isGreater={isGreater}>
        &nbsp;
      </StyledDropIndicator>
    </StyledTableCell>
  );
};

HeadCell.propTypes = {
  id: PropTypes.string,
  index: PropTypes.number.isRequired,
  label: PropTypes.string,
  role: PropTypes.string,
  disablePadding: PropTypes.bool,
  provided: PropTypes.shape({
    draggableProps: PropTypes.shape({
      style: PropTypes.shape({}),
      'data-rbd-draggable-id': PropTypes.string,
    }),
    dragHandleProps: PropTypes.shape({}),
    innerRef: PropTypes.func,
  }).isRequired,
  isActive: PropTypes.bool,
  snapshot: PropTypes.shape({
    isDragging: PropTypes.bool,
  }).isRequired,
  resizerProps: PropTypes.func.isRequired,
  dragIndex: PropTypes.shape({
    destination: PropTypes.number,
    source: PropTypes.number,
  }).isRequired,
};

HeadCell.defaultProps = {
  disablePadding: false,
  isActive: false,
  label: '',
  id: '',
  role: '',
};

export default HeadCell;
