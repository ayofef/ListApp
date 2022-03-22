import { isEdge } from 'react-flow-renderer';

export const isNodeConnectable = (sourceNodeData, targetNodeId, elements = [], allowAlreadyConnected = false) => {
  //cant connect to the same node
  if (!sourceNodeData.nodeId || sourceNodeData.nodeId === targetNodeId) return false;

  const targetNode = elements.find((el) => el.id === targetNodeId);

  //cant connect to a trigger
  if (targetNode?.data?.trigger) return false;

  if (allowAlreadyConnected) return true;
  //cant connect if the same edge already exists
  const edgeAlreadyExists = elements
    .filter(isEdge)
    .some(
      (edge) =>
        edge.target === targetNodeId &&
        edge.source === sourceNodeData.nodeId &&
        (edge.sourceHandle ?? null) === (sourceNodeData.handleId ?? null)
    );
  if (edgeAlreadyExists) {
    return false;
  }

  return true;
};
