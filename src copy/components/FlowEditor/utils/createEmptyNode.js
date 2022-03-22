export const createEmptyNode = (id, targetNode, xOffset, yOffset) => ({
  id: id,
  data: {
    __typename: 'LinkFlowStep',
    id,
    name: 'Empty',
    layout: {
      location: {
        left: targetNode.position.x + xOffset,
        top: targetNode.position.y + yOffset,
      },
    },
    empty: true,
  },
  position: {
    x: targetNode.position.x + xOffset,
    y: targetNode.position.y + yOffset,
  },
});
