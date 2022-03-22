import Box from '@material-ui/core/Box';
import React, { useState } from 'react';
import { v4 } from 'uuid';
import noop from 'lodash/noop';
import LinesEllipsis from 'react-lines-ellipsis';
import PropTypes from 'prop-types';
import { L14M } from '../../../atoms';
import { flowStepPropType } from '../../types';
import { ItemContainer } from './styled';
import NodeIcon from './NodeIcon';
import { useNodesModalContext } from '../Node/context';
import DragHandleIcon from '../../../../assets/icons/DragHandleIcon';
import NodeLibraryItemTooltip from './NodeLibraryItemTooltip';
import THEME from '../../../../constants/theme';

const NodeLibraryItem = ({ nodeData, section }) => {
  const { name } = nodeData;
  const { isModal, handleNodeClick } = useNodesModalContext();
  const [isDragging, setIsDragging] = useState(false);

  const onDragStart = (event) => {
    setIsDragging(true);
    const newNodeData = {
      ...nodeData,
      isValid: true,
      id: v4(),
    };
    event.dataTransfer.setData('application/new-node-data', JSON.stringify(newNodeData));
    // eslint-disable-next-line no-param-reassign
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDragEnd = (e) => {
    e.stopPropagation();
    setIsDragging(false);
  };

  return (
    <NodeLibraryItemTooltip name={nodeData?.name} __typename={nodeData?.__typename} isDragging={isDragging}>
      <ItemContainer
        onMouseDown={(e) => e.stopPropagation()}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onClick={isModal ? () => handleNodeClick(nodeData) : noop}
        draggable={!isModal}
      >
        <NodeIcon mr="12px" nodeData={nodeData} type={section} />
        <Box textAlign="center">
          <L14M as="span" title={name} color={THEME.primaryColors.black}>
            <LinesEllipsis text={name} maxLine={2} basedOn="letters" />
          </L14M>
        </Box>
        <Box ml="auto">
          <DragHandleIcon />
        </Box>
      </ItemContainer>
    </NodeLibraryItemTooltip>
  );
};

NodeLibraryItem.propTypes = {
  nodeData: flowStepPropType.isRequired,
  section: PropTypes.string.isRequired,
};

export { NodeLibraryItem };
