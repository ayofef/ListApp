import React, { useRef } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

const DragAndDropColumn = ({ setColumnOrder, flatColumns, children, setDragIndex }) => {
  const currentColOrder = useRef(null);

  const onDragStart = () => {
    currentColOrder.current = flatColumns?.map((column) => column.id);
  };

  const onDragEnd = (dragUpdateObj) => {
    setDragIndex({});
    const colOrder = [...currentColOrder.current];
    const sourceIndex = dragUpdateObj?.source.index;
    const destinationIndex = dragUpdateObj?.destination && dragUpdateObj?.destination?.index;

    if (!dragUpdateObj.destination) {
      return;
    }

    if (typeof sourceIndex === 'number' && typeof destinationIndex === 'number') {
      colOrder.splice(sourceIndex, 1);
      colOrder.splice(destinationIndex, 0, dragUpdateObj?.draggableId);
      setColumnOrder(colOrder);
    }
  };

  const onDragUpdate = (dragUpdateObj) => {
    const currentDragIndex = {
      destination: dragUpdateObj?.destination?.index,
      source: dragUpdateObj?.source?.index,
    };

    setDragIndex(currentDragIndex);
  };

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
      {children}
    </DragDropContext>
  );
};

DragAndDropColumn.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  flatColumns: PropTypes.arrayOf(
    PropTypes.shape({
      Header: PropTypes.string,
      disablePadding: PropTypes.bool,
      id: PropTypes.string,
      width: PropTypes.number,
    })
  ).isRequired,
  setColumnOrder: PropTypes.func.isRequired,
  setDragIndex: PropTypes.func.isRequired,
};

export default DragAndDropColumn;
