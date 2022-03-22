import React from 'react';
import PropTypes from 'prop-types';
import { CircleImage } from '../../../atoms';
import { FlowStepIcon } from '../FlowStepIcon';
import { NodeIconWrapper, StyledErrorIcon } from './styled';
import { selectColor } from '../../../../utils/selectColor';

const NodeIcon = ({ nodeData, type, mr, hasError, size }) => {
  return (
    <NodeIconWrapper background={selectColor(nodeData, type)} mr={mr} size={size}>
      {nodeData?.icon?.url ? (
        <CircleImage src={nodeData?.icon?.url} alt={nodeData?.name} size={size} draggable={false} />
      ) : (
        <FlowStepIcon group={nodeData?.group} icon={nodeData?.icon?.key} />
      )}
      {hasError && <StyledErrorIcon />}
    </NodeIconWrapper>
  );
};

NodeIcon.propTypes = {
  nodeData: PropTypes.shape({
    name: PropTypes.string,
    group: PropTypes.string,
    icon: PropTypes.shape({
      url: PropTypes.string,
      key: PropTypes.string,
    }),
  }),
  type: PropTypes.string,
  mr: PropTypes.string,
  hasError: PropTypes.bool,
  size: PropTypes.string,
};

NodeIcon.defaultProps = {
  nodeData: {},
  type: '',
  mr: '16px',
  hasError: false,
  size: null,
};

export default NodeIcon;
