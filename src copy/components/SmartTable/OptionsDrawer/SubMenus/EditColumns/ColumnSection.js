import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Box } from '@material-ui/core';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { NotificationManager } from 'react-notifications';
import { P14B } from '../../../../atoms';
import useTableContext from '../../../TableContext';
import DragAndDropColumn from '../../../DragAndDropColumn';
import ColumnItem from './ColumnItem';
import { noop } from '../../constant';

const checkIsColumnVisible = ({ localHiddenColumn, column }) => !localHiddenColumn?.includes(column);

const ColumnSection = ({ type, list, searchActive }) => {
  const { t } = useTranslation();
  const {
    localHiddenColumn,
    setLocalHiddenColumn,
    setColumnOrder,
    allColumns,
    disableHideColumns,
    setShouldSaveTable,
    shouldSaveTable,
  } = useTableContext();

  const onChangeHandler = useCallback(
    (event) => {
      const columnId = event.target.value;

      const isChecked = checkIsColumnVisible({ localHiddenColumn, column: columnId });

      if (disableHideColumns && isChecked) {
        NotificationManager.info('Need to have at least one visible column', 'Data tables', 5000);
        return;
      }

      if (isChecked) {
        setLocalHiddenColumn((prevHiddenColumns) => {
          return [...prevHiddenColumns, columnId];
        });
        if (!shouldSaveTable) {
          setShouldSaveTable(true);
        }
      } else {
        const editedColumns = localHiddenColumn.filter((column) => column !== columnId);
        setLocalHiddenColumn(editedColumns);
        if (!shouldSaveTable) {
          setShouldSaveTable(true);
        }
      }
    },
    [setLocalHiddenColumn, localHiddenColumn, setShouldSaveTable, shouldSaveTable, disableHideColumns]
  );

  return (
    <Box mb="32px">
      <P14B margin="0 0 20px 0" color="#787F88" textTransform="uppercase">
        {t(`${type} Columns`)}
      </P14B>

      <DragAndDropColumn setColumnOrder={setColumnOrder} flatColumns={allColumns} setDragIndex={noop}>
        <Droppable droppableId="droppable-drawer">
          {(droppableProvided) => (
            <Box ref={droppableProvided.innerRef}>
              {list?.map((listItem, index) => {
                const checked = checkIsColumnVisible({ localHiddenColumn, column: listItem.Header });
                return (
                  <Draggable
                    key={listItem.Header}
                    draggableId={listItem.Header}
                    index={index}
                    isDragDisabled={!checked || searchActive}
                  >
                    {(provided, snapshot) => (
                      <ColumnItem
                        listItem={listItem}
                        checked={checked}
                        provided={provided}
                        snapshot={snapshot}
                        onChangeHandler={onChangeHandler}
                      />
                    )}
                  </Draggable>
                );
              })}
              {droppableProvided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragAndDropColumn>
    </Box>
  );
};

ColumnSection.propTypes = {
  type: PropTypes.oneOf(['visible', 'hidden']).isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      Header: PropTypes.string,
    })
  ).isRequired,
  searchActive: PropTypes.bool.isRequired,
};

export default ColumnSection;
