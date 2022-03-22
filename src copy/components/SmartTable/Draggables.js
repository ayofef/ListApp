import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import HeadCell from './HeadCell';

const Draggables = ({ headerGroup, dragIndex }) => {
  return (
    <>
      {headerGroup.headers.map((column, index) => {
        return (
          <Draggable key={column.id} draggableId={column.id} index={index} isDragDisabled={!column.accessor}>
            {(provided, snapshot) => (
              <HeadCell
                provided={provided}
                id={column?.id}
                disablePadding={column?.disablePadding}
                snapshot={snapshot}
                index={index}
                resizerProps={column?.getResizerProps}
                dragIndex={dragIndex}
              >
                {column?.render('Header')}
              </HeadCell>
            )}
          </Draggable>
        );
      })}
    </>
  );
};

Draggables.propTypes = {
  headerGroup: PropTypes.shape({
    headers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        accessor: PropTypes.func,
      })
    ),
  }).isRequired,
  dragIndex: PropTypes.shape({
    destination: PropTypes.number,
    source: PropTypes.number,
  }).isRequired,
};

export default Draggables;
